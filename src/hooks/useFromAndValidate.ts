import { useState, useCallback } from "react";

import { validateInputField } from "../utils/utils";

type ErrorsObject = {
  [key: string]: boolean | undefined;
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmationCode?: boolean;
};

type InputObject = {
  [key: string]: string | undefined;
  name?: string;
  email?: string;
  password?: string;
  confirmationCode?: string;
};

export function useFormAndValidation() {
  const [values, setValues] = useState<InputObject>({});
  const [errors, setErrors] = useState<InputObject>({});
  const [showErrors, setShowErrors] = useState<ErrorsObject>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (values[name] === undefined) {
      setValues((prevInput) => ({ ...prevInput, [name]: "" }));
    }
  };

  const isValidCheck = () => {
    if (Object.keys(values).length === 0) return false;
    let checks: Boolean[] = [];
    for (const key in values) {
      const { isValid, error } = validateInputField(values[key]!, key);
      if (!isValid) setErrors((prevInput) => ({ ...prevInput, [key]: error }));
      setShowErrors((prevInput) => ({ ...prevInput, [key]: !isValid }));
      checks.push(isValid);
    }
    if (checks.every((obj) => obj === true)) return true;
    else return false;
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newShowErrors = {}) => {
      setValues(newValues);
      setErrors(newErrors);
      setShowErrors(newShowErrors);
    },
    [setValues, setErrors]
  );

  const resetValue = useCallback(
    (name: string, value: string) => {
      setValues((prevInput) => ({ ...prevInput, [name]: value }));
      setErrors((prevInput) => ({ ...prevInput, [name]: "" }));
      setShowErrors((prevInput) => ({ ...prevInput, [name]: false }));
    },
    [setValues, setErrors]
  );

  return {
    values,
    handleChange,
    handleFocus,
    errors,
    showErrors,
    resetForm,
    resetValue,
    setValues,
    isValidCheck,
  };
}
