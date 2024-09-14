import React from "react";

interface PropsType extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, PropsType>(
  (
    { id, className = "", placeholder, value, name, onChange, ...rest },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        name={name}
        id={id}
        maxLength={500}
        rows={5}
        className={`${className} w-full text-darkText p-2 rounded-md border-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

export default TextArea;
