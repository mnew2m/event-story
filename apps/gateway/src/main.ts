import {NestFactory} from '@nestjs/core';
import {GatewayModule} from './module/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(4000, '0.0.0.0');
}

bootstrap();
