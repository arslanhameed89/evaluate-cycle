import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get('APP.API_GLOBAL_PREFIX'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const documentConfig = new DocumentBuilder()
    .setTitle(config.get('APP.APP_NAME'))
    .setDescription('The Evaluate Cycle API description')
    .setVersion('1.0')
    .addServer(config.get('APP.SERVER'))
    .addTag(config.get('APP.APP_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('documentation', app, document);

  await app.listen(config.get('APP.PORT'), config.get('APP.HOST'));
}
bootstrap();
