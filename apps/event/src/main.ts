import {NestFactory, Reflector} from '@nestjs/core';
import { EventModule } from './event.module';
import {JwtAuthGuard} from "../../gateway/src/jwt/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  await app.listen(4002, '0.0.0.0');
}
bootstrap();
