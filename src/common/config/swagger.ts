import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('DevCamp')
    .setDescription('DevCamp API docs 입니다.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
