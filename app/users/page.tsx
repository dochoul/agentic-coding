'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import UserCard from '@/components/UserCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUsers, useCreateUser, useDeleteUser } from '@/lib/hooks';

export default function UsersPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    companyName: '',
    companyCatchPhrase: '',
  });

  // React Query 훅 사용
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    createUserMutation.mutate(newUser, {
      onSuccess: () => {
        setShowCreateForm(false);
        setNewUser({ name: '', username: '', email: '', phone: '', website: '', companyName: '', companyCatchPhrase: '' });
        alert('사용자가 생성되었습니다! (시뮬레이션)');
      },
      onError: () => {
        alert('사용자 생성에 실패했습니다.');
      },
    });
  };

  const handleDeleteUser = (id: number) => {
    if (!confirm('정말 이 사용자를 삭제하시겠습니까?')) return;
    
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        alert('사용자가 삭제되었습니다! (시뮬레이션)');
      },
      onError: () => {
        alert('사용자 삭제에 실패했습니다.');
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          오류: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">사용자 관리</h1>
          <p className="text-gray-600 mt-2">총 {users?.length || 0}명의 사용자</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={createUserMutation.isPending}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:opacity-50"
        >
          {showCreateForm ? '취소' : '+ 새 사용자 추가'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">새 사용자 추가</h2>
          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 *
              </label>
              <input
                type="text"
                required
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사용자명 *
              </label>
              <input
                type="text"
                required
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일 *
              </label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                웹사이트
              </label>
              <input
                type="text"
                value={newUser.website}
                onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                회사명
              </label>
              <input
                type="text"
                value={newUser.companyName}
                onChange={(e) => setNewUser({ ...newUser, companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                회사 슬로건
              </label>
              <input
                type="text"
                value={newUser.companyCatchPhrase}
                onChange={(e) => setNewUser({ ...newUser, companyCatchPhrase: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={createUserMutation.isPending}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
              >
                {createUserMutation.isPending ? '생성 중...' : '생성하기'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
        ))}
      </div>
      
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✅ <strong>실제 데이터베이스 연동:</strong> Prisma + PostgreSQL로 데이터가 실제로 저장됩니다!
        </p>
      </div>
      
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          🔄 <strong>React Query 적용:</strong> 자동 캐싱, 백그라운드 업데이트, Optimistic Updates가 적용되었습니다!
        </p>
      </div>
    </div>
  );
}
