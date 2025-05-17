import {NestFactory, Reflector} from '@nestjs/core';
import { GatewayModule } from './module/gateway.module';
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
