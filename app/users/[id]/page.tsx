'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, UpdateUserInput } from '@/lib/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { useUser, useUserPosts, useUpdateUser, useDeleteUser } from '@/lib/hooks';

function userToUpdateUserInput(user: User): UpdateUserInput {
  return {
    name: user.name,
    username: user.username,
    email: user.email,
    age: user.age ?? undefined,
    phone: user.phone ?? undefined,
    website: user.website ?? undefined,
    street: user.street ?? undefined,
    suite: user.suite ?? undefined,
    city: user.city ?? undefined,
    zipcode: user.zipcode ?? undefined,
    companyName: user.companyName ?? undefined,
    companyCatchPhrase: user.companyCatchPhrase ?? undefined,
    companyBs: user.companyBs ?? undefined,
  };
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const userId = parseInt(params.id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UpdateUserInput>({});

  // React Query 훅 사용
  const { data: user, isLoading: userLoading } = useUser(userId);
  const { data: posts, isLoading: postsLoading } = useUserPosts(userId);
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // user 데이터가 로드되면 editedUser 초기화
  useEffect(() => {
    if (!user) return;
    if (isEditing) return;
    if (Object.keys(editedUser).length > 0) return;
    setEditedUser(userToUpdateUserInput(user));
  }, [user, isEditing, editedUser]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserMutation.mutate(
      { id: userId, userData: editedUser },
      {
        onSuccess: () => {
          setIsEditing(false);
          alert('사용자 정보가 수정되었습니다! (시뮬레이션)');
        },
        onError: () => {
          alert('사용자 정보 수정에 실패했습니다.');
        },
      }
    );
  };

  const handleDelete = () => {
    if (!confirm('정말 이 사용자를 삭제하시겠습니까?')) return;
    
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        alert('사용자가 삭제되었습니다! (시뮬레이션)');
        router.push('/users');
      },
      onError: () => {
        alert('사용자 삭제에 실패했습니다.');
      },
    });
  };

  if (userLoading) return <LoadingSpinner />;
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          사용자를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/users"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">사용자 상세 정보</h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={updateUserMutation.isPending}
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteUserMutation.isPending}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deleteUserMutation.isPending ? '삭제 중...' : '삭제'}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedUser(userToUpdateUserInput(user));
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
            )}
          </div>
        </div>

        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">이름</h3>
              <p className="text-lg text-gray-900 mb-4">{user.name}</p>
              
              <h3 className="text-sm font-semibold text-gray-500 mb-1">사용자명</h3>
              <p className="text-lg text-gray-900 mb-4">@{user.username}</p>

              <h3 className="text-sm font-semibold text-gray-500 mb-1">나이</h3>
              <p className="text-lg text-gray-900 mb-4">{user.age}</p>
              
              <h3 className="text-sm font-semibold text-gray-500 mb-1">이메일</h3>
              <p className="text-lg text-gray-900 mb-4">{user.email}</p>
              
              <h3 className="text-sm font-semibold text-gray-500 mb-1">전화번호</h3>
              <p className="text-lg text-gray-900 mb-4">{user.phone}</p>
              
              <h3 className="text-sm font-semibold text-gray-500 mb-1">웹사이트</h3>
              <p className="text-lg text-gray-900 mb-4">{user.website || '-'}</p>
            </div>
            
            <div>
              {(user.street || user.city) && (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">주소</h3>
                  {user.street && <p className="text-gray-900 mb-1">{user.street}{user.suite ? `, ${user.suite}` : ''}</p>}
                  {user.city && <p className="text-gray-900 mb-4">{user.city}{user.zipcode ? `, ${user.zipcode}` : ''}</p>}
                </>
              )}
              
              {user.companyName && (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">회사</h3>
                  <p className="text-lg font-semibold text-gray-900">{user.companyName}</p>
                  {user.companyCatchPhrase && <p className="text-sm text-gray-600 italic mb-1">{user.companyCatchPhrase}</p>}
                  {user.companyBs && <p className="text-sm text-gray-500">{user.companyBs}</p>}
                </>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                value={editedUser.name ?? ''}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사용자명</label>
              <input
                type="text"
                value={editedUser.username ?? ''}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                value={editedUser.email ?? ''}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
              <input
                type="tel"
                value={editedUser.phone ?? ''}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={updateUserMutation.isPending}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
              >
                {updateUserMutation.isPending ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          작성한 게시글 {posts ? `(${posts.length})` : ''}
        </h2>
        
        {postsLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-l-4 border-primary-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.body}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">작성한 게시글이 없습니다.</p>
        )}
      </div>
      
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✅ <strong>실제 데이터베이스:</strong> 모든 변경사항이 PostgreSQL에 실제로 저장됩니다!
        </p>
      </div>
      
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          🔄 <strong>React Query 적용:</strong> 사용자 데이터와 게시글이 독립적으로 캐싱되고 자동으로 동기화됩니다!
        </p>
      </div>
    </div>
  );
}
