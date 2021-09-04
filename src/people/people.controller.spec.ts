import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';

import { MongooseModule } from '@nestjs/mongoose';

import { PeopleService } from './people.service';
import { PersonSchema } from './people.model';

describe('PersonsController', () => {
  let controller: PeopleController;

  const mockPeopleService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
      ],
      controllers: [PeopleController],
      providers: [PeopleService],
    })
      .overrideProvider(PeopleService)
      .useValue(mockPeopleService)
      .compile();

    controller = module.get<PeopleController>(PeopleController);
    console.log(controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Test geting direct friends', () => {
    expect(controller.directFriends(20)).toBe(Array);
  });
});
