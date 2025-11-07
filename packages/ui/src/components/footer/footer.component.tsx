'use client';

import React from 'react';
import { useFocusRing } from 'react-aria';

import { VisuallyHidden } from '../index.js';
import {
  BOMMultibrandSmallLogo,
  BSAMultibrandSmallLogo,
  STGMultibrandSmallLogo,
  SymbolProps,
  WBCMultibrandSmallLogo,
} from '../symbol/index.js';

import { styles as footerStyles } from './footer.styles.js';
import { type FooterProps } from './footer.types.js';

const LOGO_MAP = {
  wbc: {
    logo: (props: SymbolProps) => <WBCMultibrandSmallLogo {...props} />,
  },
  stg: {
    logo: (props: SymbolProps) => <STGMultibrandSmallLogo {...props} />,
  },
  bom: {
    logo: (props: SymbolProps) => <BOMMultibrandSmallLogo {...props} />,
  },
  bsa: {
    logo: (props: SymbolProps) => <BSAMultibrandSmallLogo {...props} />,
  },
} as const;

export function Footer({
  brand,
  logoLink = '#',
  logoAssistiveText,
  hideLogo = false,
  offsetSidebar = false,
  srOnlyText,
  className,
  children,
  ...props
}: FooterProps) {
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = footerStyles({ offsetSidebar, isFocusVisible });

  const Logo = LOGO_MAP[brand].logo;

  return (
    <footer className={styles.base({ className })} {...props}>
      <div className={styles.wrapper()}>
        <div>{children}</div>
        {!hideLogo && (
          <div className={styles.logoWrapper()}>
            <a href={logoLink} className={styles.link()} {...focusProps}>
              {srOnlyText && <VisuallyHidden>{srOnlyText}</VisuallyHidden>}
              <Logo align="right" aria-label={logoAssistiveText} />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
