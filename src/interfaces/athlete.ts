import { Category } from '../interfaces/category';

type Health = {
  haveProblem: boolean;
  description: string;
};

type Birth = {
  date: string;
  uri: string | null;
  file?: File;
};

type Photo = {
  uri: string | null;
  file?: File;
};

type Document = {
  value: string;
  uri: string | null;
  file?: File;
};

type Federation = {
  clubName: string;
  date: string;
  lastClub: boolean;
};

type School = {
  name: string;
  period: string;
  uri: string | null;
  file?: File;
};

export type Address = {
  road: string;
  number: string;
  cep: string;
  uri: string | null;
  file?: File;
};

type Parents = {
  name: string;
  phone: string;
  rg: Document;
  cpf: Document;
};

type Certificate = {
  date: string;
  uri: string | null;
  file?: File;
};

type Situation = {
  status: 'regular' | 'irregular';
  observation: string;
};

export type Athlete = {
  _id?: string;

  name: string;
  nickName: string;
  email: string;
  health: Health;
  rg: Document;
  cpf: Document;
  photo: Photo;
  birth: Birth;
  isFederated: Federation;
  school: School;
  address: Address;
  mother: Parents;
  father: Parents;
  certificateValidity: Certificate;
  situation: Situation;
  category?: Partial<Category>;

  presence?: string[];

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
