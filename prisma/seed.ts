import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 시드 데이터 생성 시작...');

  // 기존 데이터 삭제
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 사용자 데이터 생성
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: '김철수',
        username: 'chulsoo',
        email: 'chulsoo@example.com',
        phone: '010-1234-5678',
        website: 'chulsoo.dev',
        street: '강남대로',
        suite: '123호',
        city: '서울',
        zipcode: '06234',
        companyName: '테크코리아',
        companyCatchPhrase: '혁신을 선도하는 기술 기업',
        companyBs: 'AI 솔루션 개발',
        posts: {
          create: [
            {
              title: 'Next.js 14 새로운 기능',
              body: 'Next.js 14가 출시되면서 많은 개선사항이 있었습니다. 특히 Server Actions와 부분 사전 렌더링이 주목할 만합니다.',
            },
            {
              title: 'TypeScript 5.0 완벽 가이드',
              body: 'TypeScript 5.0에서는 데코레이터, const 타입 매개변수 등 많은 새로운 기능이 추가되었습니다.',
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: '이영희',
        username: 'younghee',
        email: 'younghee@example.com',
        phone: '010-2345-6789',
        website: 'younghee.blog',
        street: '테헤란로',
        suite: '456호',
        city: '서울',
        zipcode: '06158',
        companyName: '디자인스튜디오',
        companyCatchPhrase: '창의적인 디자인 솔루션',
        companyBs: 'UI/UX 디자인',
        posts: {
          create: [
            {
              title: 'Figma 플러그인 개발하기',
              body: 'Figma API를 활용하여 커스텀 플러그인을 만드는 방법을 알아봅시다.',
            },
            {
              title: '2024 디자인 트렌드',
              body: '올해는 뉴모피즘과 글래스모피즘이 계속해서 인기를 끌 것으로 예상됩니다.',
            },
            {
              title: 'Tailwind CSS 활용법',
              body: 'Tailwind CSS로 빠르게 반응형 디자인을 구현하는 방법을 소개합니다.',
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: '박민수',
        username: 'minsoo',
        email: 'minsoo@example.com',
        phone: '010-3456-7890',
        website: 'minsoo.tech',
        street: '판교로',
        suite: '789호',
        city: '성남',
        zipcode: '13494',
        companyName: '스타트업벤처',
        companyCatchPhrase: '세상을 바꾸는 아이디어',
        companyBs: '모바일 앱 개발',
        posts: {
          create: [
            {
              title: 'React Native vs Flutter',
              body: '크로스 플랫폼 모바일 앱 개발 프레임워크를 비교해봅시다.',
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: '정수연',
        username: 'sooyeon',
        email: 'sooyeon@example.com',
        phone: '010-4567-8901',
        website: 'sooyeon.io',
        street: '을지로',
        suite: '101호',
        city: '서울',
        zipcode: '04533',
        companyName: '데이터랩',
        companyCatchPhrase: '데이터 기반 의사결정',
        companyBs: '데이터 분석 및 시각화',
        posts: {
          create: [
            {
              title: 'Python 데이터 분석 입문',
              body: 'Pandas와 Matplotlib을 활용한 데이터 분석 방법을 알아봅시다.',
            },
            {
              title: 'SQL vs NoSQL',
              body: '관계형 데이터베이스와 NoSQL 데이터베이스의 차이점과 선택 기준을 살펴봅니다.',
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: '최동욱',
        username: 'dongwook',
        email: 'dongwook@example.com',
        phone: '010-5678-9012',
        website: 'dongwook.dev',
        street: '역삼로',
        suite: '202호',
        city: '서울',
        zipcode: '06234',
        companyName: '클라우드솔루션',
        companyCatchPhrase: '안정적인 인프라 제공',
        companyBs: '클라우드 서비스',
        posts: {
          create: [
            {
              title: 'AWS vs Azure vs GCP',
              body: '3대 클라우드 서비스 제공업체를 비교 분석합니다.',
            },
            {
              title: 'Docker 컨테이너 최적화',
              body: 'Docker 이미지 크기를 줄이고 성능을 최적화하는 방법을 소개합니다.',
            },
            {
              title: 'Kubernetes 입문',
              body: '컨테이너 오케스트레이션 플랫폼 Kubernetes의 기본 개념을 알아봅니다.',
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ ${users.length}명의 사용자가 생성되었습니다.`);
  
  const postCount = await prisma.post.count();
  console.log(`✅ ${postCount}개의 게시글이 생성되었습니다.`);
}

main()
  .catch((e) => {
    console.error('❌ 시드 데이터 생성 중 오류 발생:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
