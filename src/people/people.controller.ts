import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly personService: PeopleService) {}

  /**
 * @api {get} /people/direct/:id Get direct friends list
 * @apiVersion 1.0.0
 * @apiName Direct
 * @apiDescription Get list of direct friends of searched user
 * @apiGroup Person
 * @apiParam (query) {number} id Person's id
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
  []
 }
 * @apiUse NotFoundExeption
 */

  @Get('direct/:id')
  directFriends(@Param('id') id: number) {
    return this.personService.getDirectFriends(id);
  }

  /**
 * @api {get} /people/friends/:id Get friends of friends list
 * @apiVersion 1.0.0
 * @apiName Friends
 * @apiDescription Get list of friends of friends of searched user
 * @apiGroup Person
 * @apiParam (query) {number} id Person's id
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
  []
 }
 * @apiUse NotFoundExeption
 */
  @Get('friends/:id')
  friendsOfFriends(@Param('id') id: number) {
    return this.personService.getFriendsOfFriends(id);
  }

  /**
 * @api {get} /people/suggested/:id Get suggested friends list
 * @apiVersion 1.0.0
 * @apiName Suggested
 * @apiDescription Get list of suggested friends of searched user
 * @apiGroup Person
 * @apiParam (query) {number} id Person's id
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 {
  []
 }
 * @apiUse NotFoundExeption
 */
  @Get('suggested/:id')
  suggestedFriends(@Param('id') id: number) {
    return this.personService.getSuggestedFriends(id);
  }

  // @Post()
  // async insertPerson(
  //   @Body('id') id: number,
  //   @Body('firstName') firstName: string,
  //   @Body('surname') surname: string,
  //   @Body('age') age: number,
  //   @Body('gender') gender: string,
  //   @Body('friends') friends: number[],
  // ) {
  //   const newPerson = await this.personService.setInsertPerson(
  //     id,
  //     firstName,
  //     surname,
  //     age,
  //     gender,
  //     friends,
  //   );
  //   return newPerson;
  // }

  @Post('all')
  async insertFile() {
    await this.personService.setInsertFile();
    return { done: true };
  }
}
