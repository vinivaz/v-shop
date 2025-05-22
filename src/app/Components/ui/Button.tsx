import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode;
}& ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({children, ...rest}: ButtonProps) {
  return (
    <button
      className={`w-full flex items-center justify-center bg-darker text-white rounded-xl p-2 mt-4`}
      {...rest}
    >
      {children}
    </button>
  )
}