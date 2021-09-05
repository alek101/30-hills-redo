import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly personService: PeopleService) {}
  @Get('direct/:id')
  directFriends(@Param('id') id: number) {
    return this.personService.getDirectFriends(id);
  }

  @Get('friends/:id')
  friendsOfFriends(@Param('id') id: number) {
    return this.personService.getFriendsOfFriends(id);
  }

  @Get('suggested/:id')
  suggestedFriends(@Param('id') id: number) {
    return this.personService.getSuggestedFriends(id);
  }

  @Post()
  async insertPerson(
    @Body('id') id: number,
    @Body('firstName') firstName: string,
    @Body('surname') surname: string,
    @Body('age') age: number,
    @Body('gender') gender: string,
    @Body('friends') friends: number[],
  ) {
    const newPerson = await this.personService.setInsertPerson(
      id,
      firstName,
      surname,
      age,
      gender,
      friends,
    );
    return newPerson;
  }

  @Post('all')
  async insertFile() {
    await this.personService.setInsertFile();
    return { done: true };
  }
}
