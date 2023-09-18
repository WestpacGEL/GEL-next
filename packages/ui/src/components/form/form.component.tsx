import React, { createContext, useContext } from 'react';

import { ErrorMessage, FormHint, FormLabel } from './components/index.js';
import { styles } from './form.styles.js';
import { FormContextValue, type FormProps } from './form.types.js';

// ==============================
// Context and consumer hook
// ==============================
const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => useContext(FormContext);

export function Form({
  className,
  children,
  size = 'medium',
  spacing = 'medium',
  inline = false,
  ...props
}: FormProps) {
  return (
    <FormContext.Provider value={{ inline, size, spacing }}>
      <form {...props} className={styles({ className })}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.Label = FormLabel;
Form.ErrorMessage = ErrorMessage;
Form.Hint = FormHint;
