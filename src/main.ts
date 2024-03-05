import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger } from './common/config/swagger';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  setSwagger(app);
  await app.listen(3000);
}
bootstrap();
