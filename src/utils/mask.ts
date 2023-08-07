export const cleanRg = (rg: string) => {
  rg = rg.replace(/\D/g, '');

  if (rg.length <= 2) {
    rg = rg.replace(/^(\d{0,2})/, '$1');
  } else if (rg.length <= 5) {
    rg = rg.replace(/^(\d{0,2})(\d{0,3})/, '$1.$2');
  } else if (rg.length <= 8) {
    rg = rg.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
  } else if (rg.length <= 9) {
    rg = rg.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,1})/, '$1.$2.$3-$4');
  } else {
    rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1}).*/, '$1.$2.$3-$4');
  }

  return rg;
};

export const rgMask = (rg: string) => {
  if (rg.length === 11 && rg.endsWith('x')) {
    rg = rg.replace(/([0-9.]+)([a-zA-Z])/g, '$1-$2');
    return rg;
  }

  return cleanRg(rg);
};

export const cpfMask = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length <= 3) {
    cpf = cpf.replace(/^(\d{0,3})/, '$1');
  } else if (cpf.length <= 6) {
    cpf = cpf.replace(/^(\d{0,3})(\d{0,3})/, '$1.$2');
  } else if (cpf.length <= 9) {
    cpf = cpf.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, '$1.$2.$3');
  } else if (cpf.length <= 11) {
    cpf = cpf.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1.$2.$3-$4');
  } else {
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
  }

  return cpf;
};

export const dateMask = (date: string) => {
  date = date.replace(/\D/g, '');

  if (date.length <= 2) {
    date = date.replace(/^(\d{0,2})/, '$1');
  } else if (date.length <= 4) {
    date = date.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
  } else if (date.length <= 8) {
    date = date.replace(/^(\d{0,2})(\d{0,2})(\d{0,2})/, '$1/$2/$3');
  } else {
    date = date.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
  }

  return date;
};

export const phoneMask = (phone: string) => {
  phone = phone.replace(/\D/g, '');

  if (phone.length <= 2) {
    phone = phone.replace(/^(\d{0,2})/, '($1');
  } else if (phone.length <= 7) {
    phone = phone.replace(/^(\d{0,2})(\d{0,5})/, '($1) $2');
  } else if (phone.length <= 11) {
    phone = phone.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3');
  } else {
    phone = phone.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3');
  }

  if (phone.length === 1) phone = '';

  return phone;
};

export const cepMask = (cep: string) => {
  cep = cep.replace(/\D/g, '');

  if (cep.length <= 5) {
    cep = cep.replace(/^(\d{0,5})/, '$1');
  } else if (cep.length <= 8) {
    cep = cep.replace(/^(\d{0,5})(\d{0,3})/, '$1-$2');
  } else {
    cep = cep.replace(/^(\d{5})(\d{3}).*/, '$1-$2');
  }

  return cep;
};
