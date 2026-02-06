# 🚀 빠른 시작 가이드

이 문서는 프로젝트를 처음 설정하는 분들을 위한 단계별 가이드입니다.

## 📋 체크리스트

시작하기 전에 다음 항목들을 확인하세요:

- [ ] Node.js 18 이상 설치됨
- [ ] PostgreSQL 14 이상 설치됨
- [ ] npm 또는 yarn 사용 가능

## 🔧 1단계: PostgreSQL 설치

### macOS 사용자

```bash
# Homebrew로 PostgreSQL 설치
brew install postgresql@14

# PostgreSQL 서비스 시작
brew services start postgresql@14

# 데이터베이스 생성
createdb user_dashboard

# 연결 테스트
psql user_dashboard
```

### Windows 사용자

1. https://www.postgresql.org/download/windows/ 에서 설치 프로그램 다운로드
2. 설치 중 비밀번호 설정 (기억하세요!)
3. pgAdmin 또는 명령줄로 데이터베이스 생성:

```sql
CREATE DATABASE user_dashboard;
```

### Linux (Ubuntu/Debian) 사용자

```bash
# PostgreSQL 설치
sudo apt update
sudo apt install postgresql postgresql-contrib

# PostgreSQL 서비스 시작
sudo systemctl start postgresql
sudo systemctl enable postgresql

# postgres 사용자로 전환하여 데이터베이스 생성
sudo -u postgres createdb user_dashboard

# 비밀번호 설정 (선택사항)
sudo -u postgres psql
ALTER USER postgres PASSWORD 'your_password';
\q
```

## 📦 2단계: 프로젝트 설정

```bash
# 1. 압축 해제 (이미 했다면 건너뛰기)
tar -xzf user-dashboard-prisma.tar.gz
cd user-dashboard

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
```

## ⚙️ 3단계: 환경 변수 수정

`.env` 파일을 열고 다음 내용을 수정하세요:

```env
DATABASE_URL="postgresql://사용자명:비밀번호@localhost:5432/user_dashboard?schema=public"
```

### 예시

```env
# macOS/Linux (기본 설정)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_dashboard?schema=public"

# Windows (설치 시 설정한 비밀번호 사용)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/user_dashboard?schema=public"
```

## 🗄️ 4단계: 데이터베이스 설정

```bash
# Prisma 클라이언트 생성
npm run db:generate

# 데이터베이스 마이그레이션 (테이블 생성)
npm run db:migrate

# 시드 데이터 추가 (샘플 사용자 5명 생성)
npm run db:seed
```

### 예상 출력

```
✅ 5명의 사용자가 생성되었습니다.
✅ 11개의 게시글이 생성되었습니다.
```

## 🎉 5단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어보세요!

## 🎯 확인 사항

프로젝트가 제대로 실행되는지 확인:

1. ✅ 홈페이지가 보이나요?
2. ✅ "사용자 관리" 메뉴를 클릭하면 5명의 사용자가 보이나요?
3. ✅ 사용자 카드를 클릭하면 상세 페이지가 보이나요?
4. ✅ 새 사용자를 추가할 수 있나요?

## 🛠️ 유용한 명령어

```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npm run db:studio

# 데이터베이스 초기화 (모든 데이터 삭제 후 재생성)
npm run db:migrate:reset

# 시드 데이터만 다시 생성
npm run db:seed
```

## ❌ 자주 발생하는 오류

### 오류 1: "Database user_dashboard does not exist"

**해결방법:**
```bash
# 데이터베이스 생성
createdb user_dashboard

# 또는 PostgreSQL에서 직접 생성
psql -U postgres
CREATE DATABASE user_dashboard;
\q
```

### 오류 2: "password authentication failed for user postgres"

**해결방법:**
`.env` 파일의 비밀번호를 확인하세요. PostgreSQL 설치 시 설정한 비밀번호를 사용해야 합니다.

### 오류 3: "Port 3000 is already in use"

**해결방법:**
```bash
# 포트를 사용 중인 프로세스 종료
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# 또는 다른 포트 사용
PORT=3001 npm run dev
```

### 오류 4: "Cannot find module '@prisma/client'"

**해결방법:**
```bash
# Prisma 클라이언트 재생성
npm run db:generate

# 또는 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

## 🎓 다음 단계

프로젝트가 정상적으로 실행되었다면:

1. 코드를 탐색해보세요 (`app/`, `lib/`, `prisma/` 폴더)
2. Prisma Studio를 열어 데이터베이스를 확인해보세요 (`npm run db:studio`)
3. 새로운 기능을 추가해보세요!

## 💬 도움이 필요하신가요?

- Prisma 문서: https://www.prisma.io/docs
- Next.js 문서: https://nextjs.org/docs
- React Query 문서: https://tanstack.com/query/latest

즐거운 코딩 되세요! 🚀
