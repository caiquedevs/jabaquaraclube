import Creatable, { CreatableProps } from 'react-select/creatable';

interface OptionType {
  label: string;
  value: any;
}

interface SelectProps extends CreatableProps<OptionType, false, any> {}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    padding: '3px 0px',
    borderColor: '#e5e7eb',
    '&:hover': {
      borderColor: '#e5e7eb',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#cecece',
    fontSize: 16,
  }),
};

export function Select({ ...props }: SelectProps) {
  return (
    <>
      <Creatable styles={customStyles} {...props} formatCreateLabel={(value) => `Cadastrar: ${value}`} />
    </>
  );
}
