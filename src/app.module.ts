import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './people/people.module';

@Module({
  imports: [
    PersonsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Alek101:Alek1CC@cluster0.hj2ox.mongodb.net/Nestjs-Intro?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
