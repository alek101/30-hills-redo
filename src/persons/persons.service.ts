import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';

import { Person } from './persons.model';

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel('Person') private readonly personModel: Model<Person>,
  ) {}

  public async getDirectFriends(id: number): Promise<number[]> {
    const res = await this.personModel.findOne({ id }).lean();
    if (!res) {
      throw new NotFoundException('Could not find the person!');
    }
    return res.friends;
  }

  async insertPerson(
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

  async insertFile() {
    fs.readFile('./src/resources/data social graph.json', async (err, data) => {
      if (!err) {
        const list = JSON.parse(data.toString());
        const promiseList = list.map((p) =>
          this.insertPerson(
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
