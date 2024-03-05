import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setSwagger } from './common/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwagger(app);
  await app.listen(3000);
}
bootstrap();
