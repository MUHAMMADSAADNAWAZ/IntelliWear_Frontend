import React from "react";
import { FormikProps } from "formik";
import { cn } from "../../../shared/utils/tailwind-merge-classes";

export interface inputProps<FormValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  icon?: any;
  className?: string;
  labelClass?: string;
  wrapperClass?: string;
  required?: boolean;
  touched?: boolean;
  type?: string;
  topMostWrapper?: string;
  formik?: FormikProps<FormValues>;
  value?: any;
  error?: string;
  name?: string;
  hideErrors?: boolean | (() => boolean);
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  iconBackground?: boolean;
  radioOptions?: { label: string; value: string }[];
  searchText?: string;
  debouncedSearch?: (searchQuery: string) => void;
  ref?: React.RefObject<HTMLInputElement>;
}

function Input<FormValues>({
  labelText,
  icon,
  className,
  labelClass,
  wrapperClass,
  touched,
  error,
  name,
  value,
  hideErrors,
  type,
  required,
  formik,
  topMostWrapper,
  iconBackground,
  radioOptions,
  onChange,
  disabled,
  debouncedSearch,
  ref,
  searchText,
  ...rest
}: inputProps<FormValues>) {
  if (formik && name) {
    const meta = formik.getFieldMeta(name);
    value = value !== undefined ? value : formik.values[name as keyof FormValues];
    touched = meta.touched;
    error = meta.error;
    onChange = onChange || formik.handleChange;
  }

  const inputBaseClasses = `d-block text-primaryBlue-200 bg-primaryBlue-500 py-[12px] w-full font-poppins text-base text-black-700 outline-0 ${
    disabled ? "cursor-not-allowed" : ""
  }`;
  const labelBaseClass = "text-[#1F1F1F] font-normal text-base leading-6 mb-2 font-sans";
  const baseWrapperClass = "flex items-center w-full px-1 md:px-4 text-[#8B8B8B] font-normal text-base leading-6 border rounded-xl focus:outline-none";

  const shouldDisplayError =
    (touched || (formik && formik.submitCount > 0)) &&
    error &&
    typeof error === "string" &&
    !hideErrors;

  if (type === "radio" && radioOptions) {
    return (
      <div className={`w-full ${topMostWrapper}`}>
        {/* {labelText && (
          <div>
            <label className={cn(labelBaseClass, labelClass)}>
              {labelText}
              {required && <span className="text-red-500">*</span>}
            </label>
          </div>
        )} */}
        <div className={`space-y-2 ${wrapperClass}`}>
          {radioOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                {...rest}
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {shouldDisplayError && (
          <p className="text-red-500 italic mr-0 w-full text-sm text-left mt-2 mx-2">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${topMostWrapper}`}>
      <div className="flex flex-col justify-start align-middle w-full">
        {labelText && (
          <div>
            <label className={cn(labelBaseClass, labelClass)}>
              {labelText}
              {required && <span className="text-red-500">*</span>}
            </label>
          </div>
        )}
        <div className={cn(baseWrapperClass, wrapperClass)}>
          <input
            className={cn(inputBaseClasses, className)}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            ref={ref}
            {...rest}
          />
          {icon && (
            <div className={`p-1 ml-1 rounded-full ${iconBackground ? "bg-gray-100" : ""}`} onClick={() => debouncedSearch && debouncedSearch(searchText || "")}>
              {icon}
            </div>
          )}
        </div>
      </div>
      {shouldDisplayError && (
        <p className="text-red-500 italic mr-0 w-full text-sm text-left mt-2 mx-2">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;