import {IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {RewardType} from "../../../common/enum/event.enum";

export class RewardDto {
  @IsMongoId()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(RewardType)
  @IsNotEmpty()
  type: RewardType;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}