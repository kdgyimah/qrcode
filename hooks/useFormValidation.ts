import { useState, useCallback, useEffect, useMemo } from "react";
import { Category, AnyQRFormData } from "@/types/qr-generator";
import { getSchemaFor, extractErrors } from "@/validation/schema";
import { debounce } from "../utils/debounce";

export const useFormValidation = (
  category: Category,
  formData: AnyQRFormData,
  onValidityChange?: (valid: boolean, errors: Record<string, string>) => void
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const runValidation = useCallback(() => {
    const schema = getSchemaFor(category);
    if (!schema) return;
    const result = schema.safeParse(formData);
    const extracted = extractErrors(result);
    setErrors(extracted);
    const valid = Object.keys(extracted).length === 0;
    onValidityChange?.(valid, extracted);
  }, [category, formData, onValidityChange]);

  const debouncedValidation = useMemo(
    () => debounce(runValidation, 300),
    [runValidation]
  );

  useEffect(() => {
    debouncedValidation();
    return () => {
      debouncedValidation.cancel();
    };
  }, [formData, category, debouncedValidation]);

  return { errors };
};