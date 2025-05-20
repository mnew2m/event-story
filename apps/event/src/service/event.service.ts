import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import {EventDto} from "../dto/event.dto";
import {Event, EVENT_MODEL_NAME} from "../schema/event.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RewardDto} from "../dto/reward.dto";
import {Reward, REWARD_MODEL_NAME} from "../schema/reward.schema";
import {SearchEventDto} from "../dto/search-event.dto";
import {EventStatus} from "../../../common/enum/event.enum";
import {YnEnum} from "../../../common/enum/yn.enum";
import {SearchRewardDto} from "../dto/search-reward.dto";
import {RewardReqDto} from "../dto/reward-req.dto";
import {REWARD_REQ_MODEL_NAME, RewardReq} from "../schema/reward-req.schema";
import {SearchRewardReqDto} from "../dto/search-reward-req.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EVENT_MODEL_NAME) private eventModel: Model<Event>,
    @InjectModel(REWARD_MODEL_NAME) private rewardModel: Model<Reward>,
    @InjectModel(REWARD_REQ_MODEL_NAME) private rewardReqModel: Model<RewardReq>,
  ) {
  }

  // 조건에 따른 전체 event list 조회
  async getEventList(dto: SearchEventDto): Promise<Event[]> {
    const filter: any = {};

    // 부분 일치 검색 (대소문자 무시)
    if (dto.title) filter.title = { $regex: dto.title, $options: 'i' };
    if (dto.condition) filter.condition = dto.condition;
    if (dto.conditionNum !== undefined) filter.conditionNum = dto.conditionNum;
    if (dto.status) filter.status = dto.status;
    if (dto.startDate && dto.endDate) {
      filter.startDate = { $gte: dto.startDate };
      filter.endDate = { $lte: dto.endDate };
    } else {
      if (dto.startDate) filter.startDate = { $gte: dto.startDate };
      if (dto.endDate) filter.endDate = { $lte: dto.endDate };
    }

    return this.eventModel.find(filter).exec();
  }

  async saveEvent(dto: EventDto): Promise<Event> {
    const {
      title,
      desc,
      condition,
      conditionNum,
      startDate,
      endDate,
      status} = dto;

    const event = new this.eventModel({
      title,
      desc,
      condition,
      conditionNum,
      startDate,
      endDate,
      status: status || EventStatus.ACTIVE,
      rewardYn: YnEnum.N,
    });

    return event.save();
  }

  // 조건에 따른 전체 reward list, 각 reward의 event 정보 포함 조회
  async getRewardList(dto: SearchRewardDto): Promise<Reward[]> {
    const filter: any = {};

    if (dto.eventId) filter.eventId = dto.eventId;
    // 부분 일치 검색 (대소문자 무시)
    if (dto.name) filter.name = { $regex: dto.name, $options: 'i' };
    if (dto.type) filter.type = dto.type;
    if (dto.quantity) filter.quantity = dto.quantity;

    return this.rewardModel.find(filter).populate('eventId').exec();
  }

  async saveReward(dto: RewardDto): Promise<Reward> {
    const {
      eventId,
      name,
      type,
      quantity
    } = dto;

    // eventId로 Event 체크 후 진행
    const checkEvent = await this.eventModel.findById(eventId).exec();
    if (!checkEvent) throw new NotFoundException('존재하지 않는 이벤트입니다.');

    // 보상 등록 시 이벤트 rewardYn 업데이트
    checkEvent.rewardYn = YnEnum.Y;
    await checkEvent.save();

    const reward = new this.rewardModel({
      eventId,
      name,
      type,
      quantity
    });

    return reward.save();
  }

  async saveRewardReq(dto: RewardReqDto): Promise<RewardReq> {
    const {
      username,
      eventId,
      userConditionNum,
      reqDate,
      status,
      reason,
    } = dto;

    // eventId 존재 여부, event start/end Date 체크
    const checkEvent = await this.eventModel.findById(eventId).exec();
    if (!checkEvent) throw new NotFoundException('존재하지 않는 이벤트입니다.');

    const reqDateFormat: Date = new Date(reqDate);
    if (checkEvent.startDate > reqDateFormat || checkEvent.endDate < reqDateFormat) throw new BadRequestException('이벤트 기간이 아닙니다.');

    // RewardReq -> eventId, username 중복 요청 체크
    const checkRewardReq = await this.rewardReqModel.findOne({eventId, username}).exec();
    if (checkRewardReq) throw new ConflictException('보상 중복 요청입니다.');

    // conditionNum 충족 여부 체크
    if (checkEvent.conditionNum.valueOf() <= userConditionNum) {
      const rewardReq = new this.rewardReqModel({
        username,
        eventId,
        reqDate,
        status,
        reason
      });

      return rewardReq.save();
    } else {
      throw new UnprocessableEntityException('보상 지급 조건에 충족되지 않습니다.');
    }
  }

  async getRewardReqList(dto: SearchRewardReqDto): Promise<RewardReq[]> {
    const filter: any = {};

    if (dto.reqUsername && dto.reqUsername === dto.username) {
      filter.username = dto.username;
    } else if (!dto.reqUsername && dto.username) {
      filter.username = { $regex: dto.username, $options: 'i' };
    }

    if (dto.eventId) filter.eventId = dto.eventId;

    if (dto.rewardType) {
      const rewardList = await this.rewardModel.find({ type: dto.rewardType }).exec();
      const eventIdList = rewardList.map(reward => reward.eventId.toString());

      if (filter.eventId) {
        if (!eventIdList.includes(filter.eventId.toString())) {
          return [];
        }
      } else {
        filter.eventId = { $in: eventIdList };
      }
    }

    if (dto.rewardReqStatus) filter.status = dto.rewardReqStatus;

    const rewardReqList = await this.rewardReqModel.find(filter)
      .populate({
        path: 'eventId',
        match: {
          ...(dto.eventCondition && { condition: dto.eventCondition }),
          ...(dto.eventStatus && { status: dto.eventStatus })
        }
      }).exec();

    return rewardReqList.filter(rewardReq => rewardReq.eventId);
  }
}
