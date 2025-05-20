import {Schema} from "mongoose";
import {RewardType} from "../../../../common/enums/event.enum";

export const REWARD_MODEL_NAME = 'Reward';

export interface Reward extends Document {
  readonly eventId: Schema.Types.ObjectId;
  readonly name: string;
  readonly type: RewardType;
  readonly quantity: number;
}

export const RewardSchema = new Schema<Reward>(
  {
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    name: {type: String, required: true},
    type: {type: String, enum: RewardType, required: true},
    quantity: {type: Number, required: true}
  },
  {timestamps: true},
);