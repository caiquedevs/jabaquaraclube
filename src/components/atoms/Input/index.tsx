import { ErrorMessage, Field } from 'formik';
import { InputHTMLAttributes, memo } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: any;
  error?: string;
  nativeInput?: boolean;
  as?: string;
}

export function Input({ error, className, ...props }: InputProps) {
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
          <Field
            {...props}
            ref={props.inputRef}
            className={`flex w-full h-11 px-4 rounded-base border border-border-input focus:ring-blue-500 focus:border-blue-500 shadow-input shadow-transparent focus:shadow-blue-500 duration-200 disabled:bg-slate-300 disabled:opacity-70 ${
              error ? '!border-primary !shadow-primary !placeholder:text-primary' : ''
            } ${className!}`}
          />
          <ErrorMessage name={props.name!} component="div" className="mt-1 text-sm text-red-500" />
        </div>
      )}
    </>
  );
}
