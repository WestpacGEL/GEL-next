'use client';

import React, { createContext, useContext } from 'react';

import { ErrorMessage } from '../error-message/index.js';

import { FormChitChat, FormGroup, FormHint, FormLabel, FormSection } from './components/index.js';
import { FormContextValue, type FormProps } from './form.types.js';

// ==============================
// Context and consumer hook
// ==============================
const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => useContext(FormContext) || {};

export function Form({ children, spacing = 'medium', inline = false, ...props }: FormProps) {
  return (
    <FormContext.Provider value={{ inline, spacing }}>
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
