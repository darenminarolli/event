import React from "react";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, PropsType>(
  (
    { type, id, className, placeholder, name, value, onChange, ...rest },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        className={`${className} w-full text-darkText p-2 rounded-md border-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

export default Input;
