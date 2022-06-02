import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function isNumber(n: number) {
  return !isNaN(n) && isFinite(n);
}

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  const parsedPortNumber = parseInt(PORT);
  const portNumber = isNumber(parsedPortNumber) ? parsedPortNumber : 3000;
  await app.listen(portNumber);
}

bootstrap();
