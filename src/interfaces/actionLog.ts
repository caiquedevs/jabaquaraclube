import { Auth } from 'interfaces/auth';

export interface ActionLog {
  _id?: string;

  user: Auth;
  message: string;

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
