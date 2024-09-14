
type Props = {
    className?: string;
    children: React.ReactNode;
    type?: "submit" | "reset" | "button";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
  };
  
  export default function Button({
    className,
    type,
    children,
    onClick,
    disabled,
  }: Props) {
    return (
      <button
        disabled={disabled}
        type={type}
        role="button"
        aria-label="Click to perform an action"
        onClick={onClick}
        className={
          `w-full flex text-text text-center cursor-pointer items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none ${className}`
        }
      >
        {children}
      </button>
    );
  }
  