# User Dashboard - 풀스택 Next.js 프로젝트

Next.js, TypeScript, Tailwind CSS, **Prisma ORM**, **PostgreSQL**, **TanStack Query (React Query)**를 활용한 실전 사용자 관리 대시보드입니다.

## 🚀 주요 기능

- ✅ **실제 데이터베이스 연동** - PostgreSQL에 데이터가 영구 저장됩니다
- ✅ 사용자 CRUD (Create, Read, Update, Delete)
- ✅ 게시글 조회 및 관리
- ✅ Prisma ORM을 통한 타입 안전한 데이터베이스 쿼리
- ✅ React Query로 자동 캐싱 및 상태 동기화
- ✅ Next.js API Routes로 백엔드 구현
- ✅ Optimistic Updates로 즉각적인 UI 반응

## 🛠 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: TanStack Query (React Query) v5

### 백엔드
- **ORM**: Prisma
- **데이터베이스**: PostgreSQL
- **API**: Next.js API Routes (RESTful)

## 📁 프로젝트 구조

```
user-dashboard/
├── app/
│   ├── api/                    # API Routes (백엔드)
│   │   ├── users/
│   │   │   ├── route.ts        # GET, POST /api/users
│   │   │   └── [id]/
│   │   │       └── route.ts    # GET, PUT, DELETE /api/users/:id
│   │   └── posts/
│   │       └── route.ts        # GET, POST /api/posts
│   ├── users/                  # 프론트엔드 페이지
│   │   ├── page.tsx            # 사용자 목록
│   │   └── [id]/
│   │       └── page.tsx        # 사용자 상세
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈페이지
│   └── globals.css             # 전역 스타일
├── components/
│   ├── Navbar.tsx
│   ├── UserCard.tsx
│   ├── LoadingSpinner.tsx
│   └── ReactQueryProvider.tsx  # React Query 설정
├── lib/
│   ├── prisma.ts               # Prisma 클라이언트 싱글톤
│   ├── types.ts                # TypeScript 타입 정의
│   ├── api.ts                  # API 호출 함수
│   └── hooks.ts                # React Query 커스텀 훅
├── prisma/
│   ├── schema.prisma           # 데이터베이스 스키마
│   └── seed.ts                 # 시드 데이터
├── .env                        # 환경 변수
└── package.json
```

## 🏃‍♂️ 시작하기

### 1. 사전 요구사항

다음 프로그램들이 설치되어 있어야 합니다:
- Node.js 18 이상
- PostgreSQL 14 이상
- npm 또는 yarn

### 2. PostgreSQL 설치 및 데이터베이스 생성

#### macOS (Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14

# 데이터베이스 생성
createdb user_dashboard
```

#### Windows
PostgreSQL 공식 사이트에서 설치: https://www.postgresql.org/download/windows/

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# 데이터베이스 생성
sudo -u postgres createdb user_dashboard
```

### 3. 프로젝트 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열고 DATABASE_URL을 수정하세요
```

### 4. 데이터베이스 마이그레이션 및 시드

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션 실행
npx prisma migrate dev --name init

# 시드 데이터 생성 (선택사항)
npx prisma db seed
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요!

## 🗄️ 데이터베이스 스키마

### User 모델
```prisma
model User {
  id                 Int      @id @default(autoincrement())
  name               String
  username           String   @unique
  email              String   @unique
  age                String?
  phone              String?
  website            String?
  street             String?
  suite              String?
  city               String?
  zipcode            String?
  companyName        String?
  companyCatchPhrase String?
  companyBs          String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  posts              Post[]
}
```

### Post 모델
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔌 API 엔드포인트

### 사용자 API

#### `GET /api/users`
모든 사용자 목록 조회
```json
[
  {
    "id": 1,
    "name": "김철수",
    "username": "chulsoo",
    "email": "chulsoo@example.com",
    "_count": { "posts": 2 }
  }
]
```

#### `POST /api/users`
새 사용자 생성
```json
{
  "name": "홍길동",
  "username": "gildong",
  "email": "gildong@example.com",
  "phone": "010-1234-5678"
}
```

#### `GET /api/users/:id`
특정 사용자 조회 (게시글 포함)

#### `PUT /api/users/:id`
사용자 정보 수정

#### `DELETE /api/users/:id`
사용자 삭제 (연관된 게시글도 함께 삭제)

### 게시글 API

#### `GET /api/posts?userId=1`
특정 사용자의 게시글 조회

## 📚 주요 학습 포인트

### 1. Prisma ORM
- 스키마 정의 및 마이그레이션
- 타입 안전한 데이터베이스 쿼리
- 관계 설정 (1:N, N:M)
- Prisma Studio로 데이터 관리

### 2. Next.js API Routes
- RESTful API 설계
- 동적 라우트 (`[id]` 폴더)
- Request/Response 핸들링
- 에러 처리 및 상태 코드

### 3. TanStack Query (React Query)
- 자동 캐싱 및 동기화
- Optimistic Updates
- Query Keys 관리
- Mutations (Create, Update, Delete)
- DevTools 활용

### 4. TypeScript
- Prisma 자동 생성 타입
- API 요청/응답 타입 정의
- 타입 안전성 확보

### 5. PostgreSQL
- 관계형 데이터베이스 설계
- 외래 키 및 제약조건
- CASCADE 삭제

## 🛠️ 유용한 명령어

```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npx prisma studio

# 마이그레이션 생성
npx prisma migrate dev --name description

# 데이터베이스 초기화
npx prisma migrate reset

# 시드 데이터 재생성
npx prisma db seed

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🎯 환경 변수 설정

`.env` 파일 예시:

```env
# PostgreSQL 연결 URL
# 형식: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://postgres:password@localhost:5432/user_dashboard?schema=public"

# Next.js 환경 변수
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 주요 설정값
- `USER`: PostgreSQL 사용자명 (기본값: postgres)
- `PASSWORD`: PostgreSQL 비밀번호
- `HOST`: 데이터베이스 호스트 (로컬: localhost)
- `PORT`: PostgreSQL 포트 (기본값: 5432)
- `DATABASE`: 데이터베이스 이름

## 🐛 트러블슈팅

### 데이터베이스 연결 오류
```bash
# PostgreSQL 실행 확인
# macOS
brew services list

# Linux
sudo systemctl status postgresql

# PostgreSQL 비밀번호 설정/변경
psql -U postgres
ALTER USER postgres PASSWORD 'new_password';
```

### 마이그레이션 오류
```bash
# 마이그레이션 초기화
npx prisma migrate reset

# Prisma 클라이언트 재생성
npx prisma generate
```

## 🚀 배포

### Vercel + Vercel Postgres
1. Vercel에 프로젝트 배포
2. Vercel Postgres 데이터베이스 생성
3. 환경 변수 설정
4. 마이그레이션 실행

### 다른 플랫폼
- Railway: PostgreSQL 포함 원클릭 배포
- Render: 무료 PostgreSQL 제공
- DigitalOcean: App Platform + Managed Database

## 🎓 다음 단계 학습 제안

1. ✅ ~~Prisma + PostgreSQL~~ 완료!
2. **인증/인가**: NextAuth.js로 로그인 기능 추가
3. **폼 검증**: React Hook Form + Zod
4. **이미지 업로드**: Cloudinary 또는 S3
5. **페이지네이션**: React Query의 useInfiniteQuery
6. **검색 기능**: 전체 텍스트 검색 구현
7. **실시간 기능**: WebSocket 또는 Server-Sent Events
8. **테스트**: Jest + React Testing Library
9. **E2E 테스트**: Playwright

## 📝 라이선스

MIT License - 학습 목적으로 자유롭게 사용하세요!

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

---

**Happy Coding! 🎉**
