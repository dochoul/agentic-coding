import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Post } from './types';
import * as api from './api';

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  posts: (id: number) => [...userKeys.detail(id), 'posts'] as const,
};

// 사용자 목록 조회
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: api.getUsers,
  });
}

// 특정 사용자 조회
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.getUser(id),
  });
}

// 사용자의 게시글 조회
export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: userKeys.posts(userId),
    queryFn: () => api.getUserPosts(userId),
  });
}

// 사용자 생성
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) => api.createUser(userData),
    onSuccess: (newUser) => {
      // 사용자 목록 무효화하여 자동 refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      
      // Optimistic Update: 새 사용자를 캐시에 즉시 추가
      queryClient.setQueryData<User[]>(userKeys.lists(), (old) => {
        if (!old) return [newUser];
        return [newUser, ...old];
      });
    },
  });
}

// 사용자 수정
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: Partial<User> }) =>
      api.updateUser(id, userData),
    onSuccess: (updatedUser, variables) => {
      // 특정 사용자 캐시 업데이트
      queryClient.setQueryData(userKeys.detail(variables.id), updatedUser);
      
      // 사용자 목록도 무효화
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

// 사용자 삭제
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteUser(id),
    onSuccess: (_, deletedId) => {
      // 캐시에서 삭제된 사용자 제거
      queryClient.setQueryData<User[]>(userKeys.lists(), (old) => {
        if (!old) return [];
        return old.filter((user) => user.id !== deletedId);
      });
      
      // 상세 페이지 캐시도 제거
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
    },
  });
}
