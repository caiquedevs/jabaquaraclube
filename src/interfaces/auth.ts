import { Category } from 'interfaces/category';

export interface Auth {
  _id?: string;

  name: string;
  email: string;
  password?: string;
  categories?: string[];
  type: 'admin' | 'user';

  active?: boolean;

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
