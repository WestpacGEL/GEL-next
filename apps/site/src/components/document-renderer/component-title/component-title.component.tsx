import { type ComponentTitle } from './component-title.types';

export function ComponentTitle({ children }: ComponentTitle) {
  return <p className="typography-body-10 mb-[0.875rem] font-normal italic text-muted">{children}</p>;
}
