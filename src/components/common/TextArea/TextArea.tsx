import React from "react";
import { FormikProps } from "formik";
import { cn } from "../../../shared/utils/tailwind-merge-classes";

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

function TextArea<FormValues>({
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
}: textAreaProps<FormValues>) {
  if (formik) {
    /**
     * @type {import('formik').FieldMetaProps}
     */
    let meta;
    if (name) {
      meta = formik.getFieldMeta(name);
    }

    /* The code block `if (!!meta) { touched = meta.touched; error = meta.error; }` is checking if the
		`meta` object exists and then assigning the values of `meta.touched` and `meta.error` to the
		variables `touched` and `error` respectively. */
    if (meta) {
      touched = meta.touched;
      error = meta.error;
    }
    onChange = onChange || formik.handleChange;
    // handleBlur = handleBlur || formik.handleBlur;
  }
  const textAreaBaseClasses = `border-[1px] w-full border-[#302E60]  mt-4`;
  const labelBaseClass = `text-base text-white font-lexend text-black-700 font-medium  mb-[8px]`;
  console.log("the error iis", error);

  const shouldDisplayError =
    (touched || (formik && formik.submitCount > 0)) &&
    error &&
    typeof error === "string" &&
    !hideErrors;
  return (
    <div className="mb-[20px] w-full ">
      <div className="flex flex-col justify-start align-middle w-full">
        {!!labelText && (
          <label className={cn(labelBaseClass, labelClass)}>{labelText}</label>
        )}

        <div className="relative w-full">
          <textarea
            className={cn(textAreaBaseClasses, className)}
            onChange={onChange}
            name={name}
            {...rest}
          />
        </div>
      </div>
      {shouldDisplayError && (
        <p className="text-red-500 italic  mr-0 w-full text-sm  text-left mt-2 mx-2">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextArea;
