import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const options = {
    origin:'*', //[arr of origins]
    credentails:true
  }
  
  const app = await NestFactory.create(AppModule);

  //enabling cors
  app.enableCors(options)
  await app.listen(process.env.PORT || 3001);
}
try {
  bootstrap();
} catch (error:unknown) {
  Logger.log(error)
}
