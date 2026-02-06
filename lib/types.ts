export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  website: string | null;
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  companyName: string | null;
  companyCatchPhrase: string | null;
  companyBs: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
  _count?: {
    posts: number;
  };
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
    username: string;
  };
}

export interface CreateUserInput {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  companyName?: string;
  companyCatchPhrase?: string;
  companyBs?: string;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {}

