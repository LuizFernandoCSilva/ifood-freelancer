import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

const { PORT = 3000 } = process.env;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Ifood Freelancer')
    .setDescription('The Ifood Freelancer API')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const swaggerCDN =
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.css';
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
    customJs: [
      `${swaggerCDN}/swagger-ui-bundle.js`,
      `${swaggerCDN}/swagger-ui-standalone-preset.js`,
    ],
  });

  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger is running on http://localhost:${PORT}/api`);
}
bootstrap();
