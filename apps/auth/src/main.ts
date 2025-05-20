import {NestFactory} from '@nestjs/core';
import {AuthModule} from './modules/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(4001, '0.0.0.0');
}

bootstrap();
