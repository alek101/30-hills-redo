import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import * as fs from 'fs';

import { Person } from './people.model';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('Person') private readonly personModel: Model<Person>,
  ) {}

  async getDirectFriends(id: number): Promise<LeanDocument<Person>[]> {
    const directFriends = await this.getDirectFriendsId(id);
    return await this.getListOfPeople(directFriends);
  }

  // we want person that have direct firends in his friend list
  // but that person couldn't be one of direct friends, or the begin person

  async getFriendsOfFriends(id: number): Promise<LeanDocument<Person>[]> {
    const directFriends = await this.getDirectFriendsId(id);
    let friendsOfFriends;
    try {
      friendsOfFriends = await this.personModel.distinct('id', {
        $and: [
          { friends: { $in: directFriends } },
          { id: { $nin: directFriends } },
          { id: { $ne: id } },
        ],
      });
      return await this.getListOfPeople(friendsOfFriends);
    } catch (error) {
      throw new NotFoundException('Could not find the friends of friend!');
    }
  }

  // first we find all friends of friends
  // than we get distinct one by group as well as we are counting how many join friends they have with begginging person
  // and we are filtering results to have 2 by another match

  async getSuggestedFriends(id: number): Promise<LeanDocument<Person>[]> {
    const directFriends = await this.getDirectFriendsId(id);
    let suggestFriends;
    try {
      suggestFriends = await this.personModel.aggregate([
        {
          $match: {
            $and: [
              { friends: { $in: directFriends } },
              { id: { $nin: directFriends } },
              { id: { $ne: id } },
            ],
          },
        },
        {
          $project: {
            id: 1,
            friends: 1,
            numberOfJoinFriends: {
              $size: { $setIntersection: [directFriends, '$friends'] },
            },
          },
        },
        {
          $match: { numberOfJoinFriends: { $gte: 2 } },
        },
        {
          $project: {
            id: 1,
          },
        },
      ]);
      // { id: { $ne: id } } dont work for some strange reason, so:
      // I am filtering itself person out
      // $project in the end return _id regardless so:
      // I am maping ids of suggested friends
      suggestFriends = suggestFriends
        .filter((f) => f.id != id)
        .map((p) => p.id);
      return await this.getListOfPeople(suggestFriends);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Could not find the suggested friends!');
    }
  }

  private async getDirectFriendsId(id: number): Promise<number[]> {
    let person;
    try {
      person = await this.personModel.findOne({ id }).lean();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Could not find the person!');
    }
    if (!person) {
      throw new NotFoundException('Could not find the person!');
    }
    return person.friends;
  }

  private async getListOfPeople(idList: number[]) {
    try {
      return await this.personModel.find({ id: { $in: idList } }).lean();
    } catch (error) {
      console.log(error);
    }
  }

  // Insertion

  async setInsertPerson(
    id: number,
    firstName: string,
    surname: string,
    age: number,
    gender: string,
    friends: number[],
  ) {
    try {
      const person = await new this.personModel({
        id,
        firstName,
        surname,
        age,
        gender,
        friends,
      }).save();
      return person;
    } catch (error) {
      console.log(error);
    }
  }

  async setInsertFile() {
    fs.readFile('./src/resources/data social graph.json', async (err, data) => {
      if (!err) {
        const list = JSON.parse(data.toString());
        const promiseList = list.map((p) =>
          this.setInsertPerson(
            p.id,
            p.firstName,
            p.surname,
            p.age,
            p.gender,
            p.friends,
          ),
        );
        await Promise.all(promiseList);
      } else {
        console.log(err);
      }
    });
  }
}
