import React, { ReactNode, SVGAttributes } from 'react';

export type SVGProps = SVGAttributes<SVGElement> & {
  /**
   * children prop
   */
  children?: ReactNode;

  /**
   * The icon SVG metadata copyright year text
   */
  copyrightYear?: string;
};

// ==============================
// Component
// ==============================

export const Svg = ({
  copyrightYear = '',
  xmlns = 'http://www.w3.org/2000/svg',
  viewBox = '0 0 24 24',
  role = 'img',
  focusable = 'false',
  children,
  ...props
}: SVGProps) => {
  return (
    <svg xmlns={xmlns} viewBox={viewBox} role={role} focusable={focusable} {...props}>
      {copyrightYear && (
        <metadata>{`Copyright © ${copyrightYear} by Westpac Banking Corporation. All rights reserved.`}</metadata>
      )}
      {children}
    </svg>
  );
};
