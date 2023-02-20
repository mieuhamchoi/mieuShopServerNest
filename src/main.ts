import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
  .setTitle('APIs Mieu Shop Server')
  .setDescription('APIs Mieu Shop Server')
  .setVersion('1.0.0')
  .addTag('products')
  .build();
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
