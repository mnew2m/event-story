import {Module} from '@nestjs/common';
import {EventController} from '../controller/event.controller';
import {EventService} from '../service/event.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {configuration} from "../../../../config/configuration";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {EVENT_MODEL_NAME, EventSchema} from "../schema/event.schema";
import {REWARD_MODEL_NAME, RewardSchema} from "../schema/reward.schema";
import {REWARD_REQ_MODEL_NAME, RewardReqSchema} from "../schema/reward-req.schema";

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
        uri: cs.get<string>('EVENT_DB'), // configuration.ts 파일에서 가져오는 DB URI
      }),
    }),
    // 스키마 등록
    MongooseModule.forFeature([
      {name: EVENT_MODEL_NAME, schema: EventSchema},
      {name: REWARD_MODEL_NAME, schema: RewardSchema},
      {name: REWARD_REQ_MODEL_NAME, schema: RewardReqSchema},
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {
}
