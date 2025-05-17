import {NestFactory, Reflector} from '@nestjs/core';
import { AuthModule } from './auth.module';
import {JwtAuthGuard} from "../../gateway/src/jwt/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
