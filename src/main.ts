import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './common/config/swagger';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  setSwagger(app);
  await app.listen(3000);
}
bootstrap();
