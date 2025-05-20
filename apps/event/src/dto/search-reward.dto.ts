import {IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {EventCondition, EventStatus, RewardType} from "../../../../common/enums/event.enum";

export class SearchRewardDto {
  @IsMongoId()
  eventId: string;

  @IsString()
  name: string;

  @IsEnum(RewardType)
  type: RewardType;

  @IsNumber()
  quantity: number;
}