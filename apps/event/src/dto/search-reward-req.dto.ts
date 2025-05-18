import {IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {EventCondition, EventStatus, RewardReqStatus, RewardType} from "../../../common/enum/event.enum";

export class SearchRewardReqDto {
  @IsString()
  username: string;

  @IsMongoId()
  eventId: string;

  @IsEnum(EventCondition)
  eventCondition: EventCondition;

  @IsEnum(EventStatus)
  eventStatus: EventStatus;

  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsEnum(RewardReqStatus)
  rewardReqStatus: RewardReqStatus;

  @IsOptional()
  @IsString()
  reqUsername?: string;
}