import React from "react";
import { FormikProps } from "formik";
export interface textAreaProps<FormValues>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  className?: string;
  labelClass?: string;
  formik?: FormikProps<FormValues>;
  name?: string;
  hideErrors?: boolean | (() => boolean);
  required?: boolean;
  touched?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
declare function TextArea<FormValues>({
  labelText,
  className,
  formik,
  touched,
  error,
  onChange,
  name,
  hideErrors,
  labelClass,
  ...rest
}: textAreaProps<FormValues>): import("react/jsx-runtime").JSX.Element;
export default TextArea;
