type Federation = {
  clubName: string;
  date: string;
};

type School = {
  name: string;
  period: string;
};

type Address = {
  road: string;
  number: string;
  cep: string;
};

type Parents = {
  name: string;
  phone: string;
};

type Certificate = {
  date: string;
  uri?: string;
  file?: File | null;
};

type Situation = {
  status: 'regular' | 'irregular';
  observation: string;
};

export type Athlete = {
  _id?: string;

  name: string;
  uri?: string;
  photo?: File | null;
  category?: string;
  rg: string;
  cpf: string;
  dateBirth: string;
  email: string;
  isFederated: Federation;
  school: School;
  address: Address;
  mother: Parents;
  father: Parents;
  certificateValidity: Certificate;
  situation: Situation;

  presence?: string[];

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
