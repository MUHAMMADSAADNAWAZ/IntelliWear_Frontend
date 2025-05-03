import Select, { SingleValue } from "react-select";
import { FormikProps } from "formik";

interface CityOption {
  value: string;
  label: string;
}

interface CitySelectProps<FormValues> {
  labelText?: string;
  name: keyof FormValues;  
  formik: FormikProps<FormValues>;
  options: CityOption[];
  placeholder?: string;
  isClearable?: boolean;
  required?: boolean;
  labelClass?: string;
  wrapperClass?: string;
  className?: string;
  hideErrors?: boolean | (() => boolean);
}

const CitySelect = <FormValues extends Record<string, any>>({
  labelText,
  name,
  formik,
  options,
  placeholder = "Select a city",
  isClearable = true,
  required,
  labelClass,
  wrapperClass,
  className,
  hideErrors,
  ...rest
}: CitySelectProps<FormValues>) => {
  const { values, touched, errors, setFieldValue } = formik;
  const error = errors[name];
  const touchedField = touched[name];

  const shouldDisplayError = touchedField && error && !hideErrors;

  return (
    <div className={`w-full ${wrapperClass}`}>
      {labelText && (
        <label className={`text-sm font-medium mb-1 ${labelClass}`}>
          {labelText}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        {...rest}
        options={options}
        value={options.find((option) => option.value === values[name]) || null}
        onChange={(option: SingleValue<CityOption>) =>
          setFieldValue(name as string, option ? option.value : "")
        }
        placeholder={placeholder}
        isClearable={isClearable}
        className={className}
      />
      {shouldDisplayError && (
        <p className="text-red-500 italic text-sm mt-2">{String(error)}</p>
      )}
    </div>
  );
};

export default CitySelect;
