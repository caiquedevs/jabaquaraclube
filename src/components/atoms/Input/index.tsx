import { ErrorMessage, Field } from 'formik';
import React, { InputHTMLAttributes, memo } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: any;
  error?: string | undefined;
  nativeInput?: boolean;
  as?: string;
}

export function Input({ error, className, placeholder, type, ...props }: InputProps) {
  const [tooglePassword, setTooglePassword] = React.useState(true);

  const onTooglePassword = () => {
    setTooglePassword(!tooglePassword);
  };

  return (
    <>
      {props.nativeInput ? (
        <input
          {...props}
          ref={props.inputRef}
          className={`flex w-full h-11 px-4 rounded-base border border-border-input focus:ring-red-500 ${className}`}
        />
      ) : (
        <div>
          <label className="flex flex-col items-center bg-white rounded-base">
            <Field
              {...props}
              ref={props.inputRef}
              type={type === 'password' ? (tooglePassword ? 'password' : 'text') : type}
              className={`flex w-full h-11 z-20 px-4 rounded-base border border-border-input bg-transparent focus:ring-blue-500 focus:border-blue-500 shadow-input shadow-transparent focus:shadow-blue-500 duration-100 disabled:bg-slate-300 disabled:opacity-70 ${
                error ? '!border-primary !shadow-primary' : ''
              } ${className!}`}
            />

            <div
              data-active={props.value ? 'true' : 'false'}
              data-error={error ? 'true' : 'fase'}
              className="placeholder absolute top-1/2 -translate-y-1/2 left-4 duration-100"
            >
              <span className={`duration-100 text-black/60 text-sm`}>{placeholder}</span>
            </div>

            {type === 'password' ? (
              <button type="button" onClick={onTooglePassword} className="btn-scale absolute right-4 z-10">
                {tooglePassword ? <RiEyeCloseLine className={`text-xl text-white desk:text-black/50`} /> : null}
                {!tooglePassword ? <RiEyeLine className={`text-xl text-white desk:text-black/50`} /> : null}
              </button>
            ) : null}
          </label>

          <ErrorMessage name={props.name!} component="div" className="mt-1 text-sm text-red-500" />
        </div>
      )}
    </>
  );
}
