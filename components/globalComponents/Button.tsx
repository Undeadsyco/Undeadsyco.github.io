import { MouseEventHandler, ReactNode } from "react";

type props = {
  children?: ReactNode | ReactNode[];
  text?: string;
  type?: 'submit' | 'reset';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, text, type, className, onClick }: props) {
  return (
    <button type={type ?? 'button'} onClick={onClick} className={className}>
      {children ?? text}
    </button>
  );
}