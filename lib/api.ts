import { User, Post, CreateUserInput, UpdateUserInput } from './types';

const API_BASE_URL = '/api';

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return res.json();
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return res.json();
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const res = await fetch(`${API_BASE_URL}/posts?userId=${userId}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch user posts');
  }
  
  return res.json();
}

export async function createUser(userData: CreateUserInput): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create user');
  }
  
  return res.json();
}

export async function updateUser(id: number, userData: UpdateUserInput): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update user');
  }
  
  return res.json();
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete user');
  }
}

