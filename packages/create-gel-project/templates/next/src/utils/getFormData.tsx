export const getFormData = (form: HTMLFormElement) => {
  return Object.fromEntries(new FormData(form));
};
