import { defaultError } from '@/constants/form-contsants';

export const getDefaultError = (fieldName: string, errorMessage?: string) => {
  return `${fieldName}: ${errorMessage || defaultError}`;
};
