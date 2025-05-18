import {Schema} from "mongoose";
import {EventCondition, EventStatus} from "../../../common/enum/event.enum";
import {YnEnum} from "../../../common/enum/yn.enum";

export const EVENT_MODEL_NAME = 'Event';

export interface Event extends Document {
  readonly title: string;
  readonly desc: string;
  readonly condition: EventCondition;
  readonly conditionNum: Number;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly status: EventStatus;
  rewardYn: YnEnum;
}

export const EventSchema = new Schema<Event>(
  {
    title: {type: String, required: true},
    desc: {type: String},
    condition: {type: String, enum: EventCondition, required: true},
    conditionNum: {type: Number, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    status: {type: String, enum: EventStatus, default: EventStatus.ACTIVE},
    rewardYn: {type: String, enum: YnEnum, default: YnEnum.N},
  },
  {timestamps: true},
);