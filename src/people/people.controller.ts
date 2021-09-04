import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly personService: PeopleService) {}
  @Get('direct/:id')
  async directFriends(@Param('id') id: number) {
    return await this.personService.getDirectFriends(id);
  }

  @Get('friends/:id')
  async friendsOfFriends(@Param('id') id: number) {
    return await this.personService.getFriendsOfFriends(id);
  }

  @Get('suggested/:id')
  async suggestedFriends(@Param('id') id: number) {
    return await this.personService.getSuggestedFriends(id);
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
  }
}
