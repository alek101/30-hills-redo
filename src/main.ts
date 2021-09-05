import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  return await app.listen(3000);
}

const appServer = bootstrap();
export default appServer;
