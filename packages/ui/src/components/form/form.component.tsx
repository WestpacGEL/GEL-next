import React, { createContext, useContext } from 'react';

import { ErrorMessage, FormChitChat, FormGroup, FormHint, FormLabel, FormSection } from './components/index.js';
import { FormContextValue, type FormProps } from './form.types.js';

// ==============================
// Context and consumer hook
// ==============================
const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => useContext(FormContext) || {};

export function Form({ children, size = 'medium', spacing = 'medium', inline = false, ...props }: FormProps) {
  return (
    <FormContext.Provider value={{ inline, size, spacing }}>
      <form {...props}>{children}</form>
    </FormContext.Provider>
  );
}

Form.Label = FormLabel;
Form.ErrorMessage = ErrorMessage;
Form.Hint = FormHint;
Form.Section = FormSection;
Form.ChitChat = FormChitChat;
Form.Group = FormGroup;
