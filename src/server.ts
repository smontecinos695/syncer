import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextLinkInterceptor } from './next-link.interceptor';

function isNumber(n: number) {
  return !isNaN(n) && isFinite(n);
}

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  const parsedPortNumber = parseInt(PORT);
  const config = app.get(ConfigService);
  app.useGlobalInterceptors(new NextLinkInterceptor(config));
  const portNumber = isNumber(parsedPortNumber) ? parsedPortNumber : 3000;
  await app.listen(portNumber);
}

bootstrap();
