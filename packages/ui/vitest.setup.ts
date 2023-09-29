import '@testing-library/jest-dom';

const noop = () => {
  return;
};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
Object.defineProperty(window.URL, 'createObjectURL', {
  value: () => new Blob(),
  writable: true,
});
Object.defineProperty(window.URL, 'revokeObjectURL', { value: noop, writable: true });
