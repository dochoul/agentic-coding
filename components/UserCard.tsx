import Link from 'next/link';
import { User } from '@/lib/types';

interface UserCardProps {
  user: User;
  onDelete?: (id: number) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">@{user.username}</p>
          <p className="text-sm text-gray-600 mb-1">📧 {user.email}</p>
          {user.phone && <p className="text-sm text-gray-600 mb-1">📱 {user.phone}</p>}
          {user.website && <p className="text-sm text-gray-600 mb-3">🌐 {user.website}</p>}
          
          {user.companyName && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-500 font-semibold mb-1">회사</p>
              <p className="text-sm text-gray-700">{user.companyName}</p>
              {user.companyCatchPhrase && (
                <p className="text-xs text-gray-500 italic">{user.companyCatchPhrase}</p>
              )}
            </div>
          )}
          
          {user._count && (
            <div className="mt-3">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                게시글 {user._count.posts}개
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <Link
          href={`/users/${user.id}`}
          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors text-center text-sm font-medium"
        >
          상세보기
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(user.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}

