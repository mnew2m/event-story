import {IsDate, IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";
import {EventCondition, EventStatus} from "../../../common/enum/event.enum";

export class EventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  desc: string;

  @IsEnum(EventCondition)
  @IsNotEmpty()
  condition: EventCondition;

  @IsNumber()
  @IsNotEmpty()
  conditionNum: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsEnum(EventStatus)
  status: EventStatus;
}