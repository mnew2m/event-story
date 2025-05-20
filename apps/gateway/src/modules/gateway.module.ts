import {Module} from '@nestjs/common';
import {GatewayController} from '../controllers/gateway.controller';
import {GatewayAuthController} from '../controllers/gateway-auth.controller';
import {GatewayService} from '../services/gateway.service';
import {JwtAuthGuard} from "../jwt/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {JwtStrategy} from "../jwt/jwt.strategy";
import {ConfigModule} from "@nestjs/config";
import {configuration} from "../../../../config/configuration";
import {AuthModule} from "../../../auth/src/modules/auth.module";
import {HttpModule} from "@nestjs/axios";
import {APP_GUARD} from "@nestjs/core";
import {GatewayEventController} from "../controllers/gateway-event.controller";

@Module({
  imports: [
    HttpModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 등록
      load: [configuration], // configuration.ts 파일에서 설정값 load
      envFilePath: ['.env'], // env 파일 경로
    }),
  ],
  controllers: [GatewayController, GatewayAuthController, GatewayEventController],
  providers: [GatewayService, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class GatewayModule {
}
