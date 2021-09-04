import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}
  @Get('direct/:id')
  async getDirectFriends(@Param('id') id: number) {
    return this.personService.getDirectFriends(id);
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
    try {
      const newPerson = await this.personService.insertPerson(
        id,
        firstName,
        surname,
        age,
        gender,
        friends,
      );
      return newPerson;
    } catch (error) {
      console.log(error);
    }
  }

  @Post('all')
  async insertFile() {
    await this.personService.insertFile();
  }
}
