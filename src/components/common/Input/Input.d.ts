import React from "react";
import { FormikProps } from "formik";
export interface inputProps<FormValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  icon?: React.ReactNode;
  className?: string;
  labelClass?: string;
  wrapperClass?: string;
  required?: boolean;
  touched?: boolean;
  formik?: FormikProps<FormValues>;
  error?: string;
  name?: string;
  hideErrors?: boolean | (() => boolean);
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
declare function Input<FormValues>({
  labelText,
  icon,
  className,
  labelClass,
  wrapperClass,
  touched,
  error,
  name,
  hideErrors,
  required,
  formik,
  onChange,
  ...rest
}: inputProps<FormValues>): import("react/jsx-runtime").JSX.Element;
export default Input;
