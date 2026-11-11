import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that don't have decorators
      forbidNonWhitelisted: true,
      transform: true, // automatically transforms payloads to be objects typed according to their dto claases
      disableErrorMessages: false,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
