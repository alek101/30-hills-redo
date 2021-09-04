import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './people.model';

describe('PersonsService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
      ],
      providers: [PeopleService],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
