import { parse, differenceInYears } from 'date-fns';

export function getAge(date: string) {
  const dataNascimentoDate = parse(date, 'dd/MM/yyyy', new Date());
  const idade = differenceInYears(new Date(), dataNascimentoDate);
  return `${idade} anos`;
}
