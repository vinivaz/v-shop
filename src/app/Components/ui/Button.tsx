import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  children: React.ReactNode;
  customStyle?: string;
  variant?: string;
}& ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-darker text-white hover:bg-lighter',
  secondary: 'bg-transparent text-black border-2 border-secondary-border hover:border-product-bg',
  transparent: 'bg-transparent text-black',
};

export function Button(props: ButtonProps) {
  const {children, variant = "primary", customStyle = "", ...rest} = props;

  const finalClassName = twMerge(
    clsx(
      "w-full flex items-center justify-center rounded-xl p-2 mt-4",
      variantStyles[variant],
    ),
    customStyle
  )

  
  return (
    <button
      className={finalClassName}
      {...rest}
    >
      {children}
    </button>
  )
}