import { useState } from "react";

type FormErrors = Record<string, string>;

export function useFormWithValidation() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, validationMessage, form } = event.target;

    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(form ? form.checkValidity() : false);
  }

  return { errors, isValid, handleChange };
}
