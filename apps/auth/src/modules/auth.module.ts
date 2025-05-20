import {Module} from '@nestjs/common';
import {AuthController} from '../controllers/auth.controller';
import {AuthService} from '../services/auth.service';
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {configuration} from "../../../../config/configuration";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {USER_MODEL_NAME, UserSchema} from "../schemas/user.schema";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../../../gateway/src/jwt/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 등록
      load: [configuration], // configuration.ts 파일에서 설정값 load
      envFilePath: ['.env'], // env 파일 경로
    }),
    // DB 등록
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cs: ConfigService): Promise<MongooseModuleOptions> => ({
        uri: cs.get<string>('AUTH_DB'), // configuration.ts 파일에서 가져오는 DB URI
      }),
    }),
    // 스키마 등록
    MongooseModule.forFeature([
        { name: USER_MODEL_NAME, schema: UserSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: configuration().JWT.SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {
}
