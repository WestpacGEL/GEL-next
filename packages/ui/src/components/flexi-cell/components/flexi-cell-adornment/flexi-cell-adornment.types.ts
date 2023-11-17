import { type HTMLAttributes, type ReactNode } from 'react';

export type FlexiCellAdornmentProps = {
  /**
   * Define the alignment of content
   */
  align?: 'center' | 'top' | 'bottom';
  /**
   * Children attribute
   */
  children?: ReactNode;
  /**
   * Display an Icon, Symbol, Pictogram or other SVG with correct responsive styling
   * - Style can be applied by spreading props on component that is passed in
   * - Styles/display can be changed manually by not spreading props and adding a className to component being passed in
   */
  leftGraphic?: (props: { className: string }) => JSX.Element;
  /**
   * Display an Image or other graphic with correct style
   * - Style can be applied by spreading props on component that is passed in
   * - Styles/display can be changed manually by not spreading props and adding a className to component being passed in
   */
  promoGraphic?: (props: { className: string }) => JSX.Element;
  /**
   * Component's tag
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLOrSVGElement>;
