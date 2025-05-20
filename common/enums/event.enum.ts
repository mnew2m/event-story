export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EventCondition {
  LOGIN_CHAIN = 'EC.001', // 연속 로그인
  LOGIN_TOTAL = 'EC.002', // 누적 로그인
  INVITE_COUNT = 'EC.003', // 친구 초대 수
  MONSTER_KILL = 'EC.004', // 몬스터 N마리 처치
}

export enum RewardType {
  POINT = 'RT.001',
  ITEM = 'RT.002',
  COUPON = 'RT.003',
}

export enum RewardReqStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}