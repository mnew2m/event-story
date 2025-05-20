# 📦 event-story

NestJS 기반의 MSA 아키텍처 이벤트/보상 시스템\
Auth / Event / Gateway 서비스로 구성되어 있으며, MongoDB를 사용합니다.
---

## 🚀 실행 방법 (Docker Compose)

```bash
docker compose up --build
```
---

## ✨ API 테스트 (Postman)
Postman으로 API 테스트를 하기 위해서 아래 컬렉션 파일 import가 필요합니다.

```
docs/event-story.postman_collection.json
```

### 사용 방법
1. Postman 실행
2. `Import` → `File` → 위 파일 선택
3. `gateway > auth`, `gateway > event` 경로에서 테스트 가능
---

## 📌 프로젝트 구조
```plaintext
apps/
├── auth/     # 유저 정보 관리, 로그인, 역할 관리, JWT 발급
├── event/    # 이벤트 생성, 보상 정의, 보상 요청 처리, 지급 상태 저장
└── gateway/  # 모든 API 요청의 진입점, 인증/권한 검사 및 라우팅

common/       # 공통 타입, 데코레이터 등
docs/         # Postman 설정 파일
```

## 📑 추가 설명
- **이벤트 설계**
  - 이벤트는 시작일/종료일 기준으로 유효성 검증되며, 클라이언트가 요청하는 시점(`reqDate`)을 기준으로 검증됩니다.
  - 보상 중복 요청 방지를 위해 `username + eventId` 기준 중복 검사 로직이 존재합니다.
- **설계 기준**
  - NestJS를 서비스 단위로 분리하여 `auth`, `event`, `gateway` 각각 독립적으로 확장 가능하도록 구성되어 있습니다.
  - Mongoose를 사용한 MongoDB 연동, DTO 기반 유효성 검사 및 Transform 적용
### 👤 사용자 역할 정의 (UserRole)
| 역할         | 설명                     |
|------------|------------------------|
| `USER`     | 일반 사용자. 보상 요청만 가능      |
| `OPERATOR` | 운영 담당자. 이벤트 및 보상 등록 가능 |
| `AUDITOR`  | 감사자. 보상 이력 조회만 가능      |
| `ADMIN`    | 관리자. 모든 기능 접근 가능       |
→ 각 API 요청 시 `@Roles()`을 통해 역할 기반 접근 제거를 수행합니다.