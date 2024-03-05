import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setSwagger } from './common/config/swagger';
import { HttpExceptionFilter } from './common/filter/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  setSwagger(app);
  await app.listen(3000);
}
bootstrap();
