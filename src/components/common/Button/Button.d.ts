import React, { ReactNode } from "react";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "outline"
    | undefined;
  fullWidth?: boolean;
  parentClass?: string;
  className?: string;
  disabled?: boolean;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
