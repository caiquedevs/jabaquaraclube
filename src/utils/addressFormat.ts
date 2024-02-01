import { Address } from 'interfaces/athlete';

export function addressFormat(address: Address | undefined) {
  let enderecoFormatado = '';

  if (!address) return null;

  if (address.road) enderecoFormatado += address.road;
  if (address.number) enderecoFormatado += ', ' + address.number;
  if (address.cep) enderecoFormatado += ' - ' + address.cep;

  return enderecoFormatado;
}
