import { Athlete } from 'interfaces/athlete';
import { Mode } from 'interfaces/mode';
import { deviceIsAndroid } from 'utils/isAndroid';

export const isAndroid = deviceIsAndroid();

export const initialValuesAthlete: Athlete & Mode = {
  name: '',
  nickName: '',
  email: '',
  mode: 'create',
  health: {
    haveProblem: false,
    description: '',
  },
  photo: {
    uri: '',
    file: undefined,
  },
  category: {
    _id: undefined,
    name: undefined,
  },
  rg: {
    value: '',
    uri: '',
    file: undefined,
  },
  cpf: {
    uri: '',
    value: '',
    file: undefined,
  },
  birth: {
    date: '',
    uri: '',
    file: undefined,
  },
  isFederated: {
    clubName: '',
    date: '',
    lastClub: false,
  },
  school: {
    name: '',
    period: '',
    uri: '',
    file: undefined,
  },
  address: {
    road: '',
    number: '',
    cep: '',
    uri: '',
    file: undefined,
  },
  mother: {
    name: '',
    phone: '',
    rg: {
      uri: '',
      value: '',
      file: undefined,
    },
    cpf: {
      uri: '',
      value: '',
      file: undefined,
    },
  },
  father: {
    name: '',
    phone: '',
    rg: {
      uri: '',
      value: '',
      file: undefined,
    },
    cpf: {
      uri: '',
      value: '',
      file: undefined,
    },
  },
  certificateValidity: {
    date: '',
    uri: '',
    file: undefined,
  },
  situation: {
    status: 'regular',
    observation: '',
  },
};
