import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PersonSchema } from './people.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PersonsModule {}
