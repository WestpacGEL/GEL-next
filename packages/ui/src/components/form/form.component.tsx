'use client';

import React, { createContext, useContext } from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';

import { FormContextValue, type FormProps } from './form.types.js';

// ==============================
// Context and consumer hook
// ==============================
const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => useContext(FormContext) || {};

export function Form({ children, spacing = 'medium', inline = false, ...props }: FormProps) {
  const breakpoint = useBreakpoint();
  return (
    <FormContext.Provider
      value={{
        inline: resolveResponsiveVariant(inline, breakpoint),
        spacing: resolveResponsiveVariant(spacing, breakpoint),
      }}
    >
      <form {...props}>{children}</form>
    </FormContext.Provider>
  );
}
