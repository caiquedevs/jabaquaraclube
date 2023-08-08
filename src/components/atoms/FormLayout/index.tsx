import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  formClassName?: string;
};

export function FormLayout(props: Props) {
  return (
    <div
      className={`w-full flex flex-col rounded-xl lg:!max-w-470px lg:!min-w-470px lg:!pt-12 lg:!pb-11 lg:!px-51px lg:mx-auto lg:bg-white lg:shadow-base lg:border lg:border-border-base  ${props.formClassName}`}
    >
      {props.title || props.description ? (
        <header className="flex flex-col gap-1.5 mb-6">
          <h1 className="font-changa font-semibold text-2xl text-black/70">{props.title || null}</h1>
          <p className="font-roboto font-normal text-base text-black/60">{props.description || null}</p>
        </header>
      ) : null}

      {props.children}
    </div>
  );
}

export const TitleForm = ({ children, className }: any) => {
  return <h1 className={`mb-1.5 flex gap-1.5 font-changa font-semibold text-3xl text-black/70 ${className}`}>{children}</h1>;
};

export const DescriptionForm = ({ children, className }: any) => {
  return <p className={`mb-7 lg:mb-6 font-roboto font-normal text-base text-black/60 ${className}`}>{children}</p>;
};
