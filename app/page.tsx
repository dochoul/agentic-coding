import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          사용자 관리 대시보드
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Next.js + Prisma + PostgreSQL + React Query를 활용한 풀스택 CRUD 프로젝트
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🗄️</div>
            <h3 className="text-xl font-semibold mb-2">실제 데이터베이스</h3>
            <p className="text-gray-600 mb-4">
              PostgreSQL 데이터베이스에 실제로 데이터가 저장됩니다
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Prisma ORM</h3>
            <p className="text-gray-600 mb-4">
              타입 안전한 데이터베이스 쿼리와 마이그레이션을 제공합니다
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">React Query</h3>
            <p className="text-gray-600 mb-4">
              자동 캐싱과 서버 상태 동기화로 최적의 UX를 제공합니다
            </p>
          </div>
        </div>
        
        <Link
          href="/users"
          className="inline-block mt-12 bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          사용자 관리 시작하기 →
        </Link>
        
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 학습 포인트
          </h3>
          <ul className="text-left text-blue-800 space-y-2 max-w-2xl mx-auto">
            <li>✓ Next.js 14 App Router & API Routes</li>
            <li>✓ Prisma ORM & PostgreSQL 데이터베이스</li>
            <li>✓ React Query로 서버 상태 관리</li>
            <li>✓ RESTful API 설계 및 구현</li>
            <li>✓ TypeScript 타입 안전성</li>
            <li>✓ Tailwind CSS 스타일링</li>
            <li>✓ 실제 프로덕션 환경 구조</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
