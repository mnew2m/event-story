import {Body, Controller, Post, Req} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {Roles} from "../roles/roles.decorator";
import {EventDto} from "../../../event/src/dto/event.dto";
import {RewardDto} from "../../../event/src/dto/reward.dto";
import {SearchEventDto} from "../../../event/src/dto/search-event.dto";
import {UserRole} from "../../../../common/enums/auth.enum";
import {SearchRewardDto} from "../../../event/src/dto/search-reward.dto";
import {RewardReqDto} from "../../../event/src/dto/reward-req.dto";
import {SearchRewardReqDto} from "../../../event/src/dto/search-reward-req.dto";
import {AuthRequest} from "../../../../common/interfaces/auth-request.interface";

const EVENT_BASE_URL = 'http://event:4002';

@Controller()
export class GatewayEventController {
  constructor(private readonly http: HttpService) {
  }

  // 이벤트 목록 조회
  @Post('event/list')
  @Roles(UserRole.USER, UserRole.OPERATOR, UserRole.ADMIN)
  async getEventList(@Body() body: SearchEventDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/event/list`, body)
    );
    return data;
  }

  // 이벤트 등록
  @Post('event/save')
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  async saveEvent(@Body() body: EventDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/event/save`, body)
    );
    return data;
  }

  // 보상 목록 조회
  @Post('reward/list')
  @Roles(UserRole.USER, UserRole.OPERATOR, UserRole.ADMIN)
  async getRewardList(@Body() body: SearchRewardDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/reward/list`, body)
    );
    return data;
  }

  // 보상 등록
  @Post('reward/save')
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  async saveReward(@Body() body: RewardDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/reward/save`, body)
    );
    return data;
  }

  // 이벤트에 대한 보상 요청
  @Post('reward-req/save')
  @Roles(UserRole.USER, UserRole.ADMIN)
  async saveRewardReq(@Body() body: RewardReqDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/reward-req/save`, body)
    );
    return data;
  }

  // 요청 내역 조회 (전체)
  @Post('reward-req/list')
  @Roles(UserRole.OPERATOR, UserRole.AUDITOR, UserRole.ADMIN)
  async getRewardReqList(@Body() body: SearchRewardReqDto) {
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/reward-req/list`, body)
    );
    return data;
  }

  // 요청 내역 조회 (본인)
  @Post('reward-req/my-list')
  @Roles(UserRole.USER, UserRole.OPERATOR, UserRole.AUDITOR, UserRole.ADMIN)
  async getRewardReqMyList(
    @Req() req: AuthRequest,
    @Body() body: SearchRewardReqDto
  ) {
    const payload = {
      ...body,
      reqUsername: req.user.username,
    }
    const {data} = await firstValueFrom(
      this.http.post(`${EVENT_BASE_URL}/reward-req/my-list`, payload)
    );
    return data;
  }
}
