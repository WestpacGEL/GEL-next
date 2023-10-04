import '@testing-library/jest-dom';

// const id = useId();
const noop = () => {
  return;
};

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
// See https://github.com/jsdom/jsdom/issues/1721 as to why below property definitions are needed
Object.defineProperty(window.URL, 'createObjectURL', {
  // Below needs to return unique string
  // while Math.random() does not guarantee IDs to be unique it should be fine for only generating a couple of ids per test
  value: () => Math.random().toString(),
  writable: true,
});
Object.defineProperty(window.URL, 'revokeObjectURL', { value: noop, writable: true });
