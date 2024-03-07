import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('DevCamp')
    .setDescription('DevCamp API docs 입니다.')
    .setVersion('1.0')
    .addBasicAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
