import {IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {RewardReqStatus, RewardType} from "../../../../common/enums/event.enum";
import {Type} from "class-transformer";

export class RewardReqDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsMongoId()
  @IsNotEmpty()
  eventId: string;

  @IsNumber()
  @IsNotEmpty()
  userConditionNum: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  reqDate: Date;

  @IsEnum(RewardReqStatus)
  status: RewardReqStatus;

  @IsString()
  reason: string;
}