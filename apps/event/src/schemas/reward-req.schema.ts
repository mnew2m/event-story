import {Schema} from "mongoose";
import {RewardReqStatus} from "../../../../common/enums/event.enum";

export const REWARD_REQ_MODEL_NAME = 'RewardReq';

export interface RewardReq extends Document {
  readonly username: string;
  readonly eventId: Schema.Types.ObjectId;
  readonly reqDate: Date;
  status: RewardReqStatus;
  readonly reason: string; // 실패사유 등
}

export const RewardReqSchema = new Schema<RewardReq>(
  {
    username: {type: String, required: true},
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    reqDate: {type: Date, required: true},
    status: {type: String, enum: RewardReqStatus, default: RewardReqStatus.PENDING},
    reason: {type: String},
  }
);