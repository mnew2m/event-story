import {Body, Controller, ForbiddenException, Post} from '@nestjs/common';
import {EventService} from '../services/event.service';
import {EventDto} from "../dto/event.dto";
import {Event} from "../schemas/event.schema";
import {RewardDto} from "../dto/reward.dto";
import {Reward} from "../schemas/reward.schema";
import {SearchEventDto} from "../dto/search-event.dto";
import {SearchRewardDto} from "../dto/search-reward.dto";
import {RewardReq} from "../schemas/reward-req.schema";
import {RewardReqDto} from "../dto/reward-req.dto";
import {SearchRewardReqDto} from "../dto/search-reward-req.dto";

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // 이벤트 목록 조회
  @Post('event/list')
  async getEventList(@Body() dto: SearchEventDto): Promise<Event[]> {
    return this.eventService.getEventList(dto);
  }

  // 이벤트 등록
  @Post('event/save')
  async saveEvent(@Body() dto: EventDto): Promise<Event> {
    return this.eventService.saveEvent(dto);
  }

  // 보상 목록 조회
  @Post('reward/list')
  async getRewardList(@Body() dto: SearchRewardDto): Promise<Reward[]> {
    return this.eventService.getRewardList(dto);
  }

  // 보상 등록
  @Post('reward/save')
  async saveReward(@Body() dto: RewardDto): Promise<Reward> {
    return this.eventService.saveReward(dto);
  }

  // 이벤트에 대한 보상 요청
  @Post('reward-req/save')
  async saveRewardReq(@Body() dto: RewardReqDto): Promise<RewardReq> {
    return this.eventService.saveRewardReq(dto);
  }

  // 요청 내역 조회 (전체)
  @Post('reward-req/list')
  async getRewardReqList(@Body() dto: SearchRewardReqDto): Promise<RewardReq[]> {
    return this.eventService.getRewardReqList(dto);
  }

  // 요청 내역 조회 (본인)
  @Post('reward-req/my-list')
  async getRewardReqMyList(@Body() dto: SearchRewardReqDto
  ): Promise<RewardReq[]> {
    if (dto.reqUsername === dto.username) {
      return this.eventService.getRewardReqList(dto);
    } else {
      throw new ForbiddenException('You are not allowed to access this user\'s data');
    }
  }
}
