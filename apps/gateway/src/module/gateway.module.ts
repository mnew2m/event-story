import {Module} from '@nestjs/common';
import {GatewayController} from '../controller/gateway.controller';
import {GatewayAuthController} from '../controller/gateway-auth.controller';
import {GatewayService} from '../service/gateway.service';
import {JwtAuthGuard} from "../jwt/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {JwtStrategy} from "../jwt/jwt.strategy";
import {ConfigModule} from "@nestjs/config";
import {configuration} from "../../../../config/configuration";
import {AuthModule} from "../../../auth/src/auth.module";
import {HttpModule} from "@nestjs/axios";
import {APP_GUARD} from "@nestjs/core";
import {GatewayEventController} from "../controller/gateway-event.controller";

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
