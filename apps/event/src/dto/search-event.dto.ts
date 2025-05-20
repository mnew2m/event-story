import {IsDate, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {EventCondition, EventStatus} from "../../../../common/enums/event.enum";

export class SearchEventDto {
  @IsString()
  title: string;

  @IsEnum(EventCondition)
  condition: EventCondition;

  @IsNumber()
  @IsOptional()
  conditionNum?: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsEnum(EventStatus)
  status: EventStatus;
}