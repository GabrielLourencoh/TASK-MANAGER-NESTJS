import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from 'src/modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'src/config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription(
      'API para gerenciamento de tarefas (Tasks) e usuários (Users).',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.APP_PORT ?? 3000);

  if (env.APP_ENV === 'dev') {
    console.log('----------------------------------------------------');
    console.log(`API rodando na porta ${env.APP_PORT}`);
    console.log(`API: ${env.APP_URL}`);
    console.log(`Docs: ${env.APP_URL}/api`);
    console.log('----------------------------------------------------');
  }
}
bootstrap();
