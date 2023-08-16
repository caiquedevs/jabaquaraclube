import { Category } from 'interfaces/category';

type Birth = {
  date: string;
  uri?: string;
  file?: File;
};

type Photo = {
  uri?: string;
  file?: File;
};

type Document = {
  value: string;
  uri?: string;
  file?: File;
};

type Federation = {
  clubName: string;
  date: string;
};

type School = {
  name: string;
  period: string;
  uri?: string;
  file?: File;
};

type Address = {
  road: string;
  number: string;
  cep: string;
  uri?: string;
  file?: File;
};

type Parents = {
  name: string;
  phone: string;
};

type Certificate = {
  date: string;
  uri?: string;
  file?: File;
};

type Situation = {
  status: 'regular' | 'irregular';
  observation: string;
};

export type Athlete = {
  _id?: string;

  name: string;
  email: string;
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
