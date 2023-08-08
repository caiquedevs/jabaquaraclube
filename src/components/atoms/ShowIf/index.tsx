import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'span' | 'small' | 'strong' | 'figure';
  children: any;
  show: boolean | string | number | File | undefined | null;
}

export function ShowIf({ as, show, children, ...props }: Props) {
  const Element = as || React.Fragment;

  if (!show) return <></>;

  return <Element {...props}>{children}</Element>;
}
