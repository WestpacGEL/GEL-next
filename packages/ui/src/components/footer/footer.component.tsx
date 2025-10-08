'use client';

import React, { useMemo } from 'react';
import { useFocusRing } from 'react-aria';

import { Grid, GridItem, VisuallyHidden } from '../index.js';
import {
  BOMMultibrandSmallLogo,
  BSAMultibrandSmallLogo,
  RAMSMultibrandSmallLogo,
  STGMultibrandSmallLogo,
  SymbolProps,
  WBCMultibrandSmallLogo,
  WBGMultibrandSmallLogo,
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
  wbg: {
    logo: (props: SymbolProps) => <WBGMultibrandSmallLogo {...props} />,
  },
  rams: {
    logo: (props: SymbolProps) => <RAMSMultibrandSmallLogo {...props} />,
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
        <Grid className={styles.topRow()}>
          <GridItem span={12}>{children}</GridItem>
        </Grid>
        {!hideLogo && (
          <Grid>
            <GridItem span={{ initial: 12, md: 1 }}>
              <a href={logoLink} className={styles.link()} {...focusProps}>
                {srOnlyText && <VisuallyHidden>{srOnlyText}</VisuallyHidden>}
                <Logo align="right" aria-label={logoAssistiveText} />
              </a>
            </GridItem>
          </Grid>
        )}
      </div>
    </footer>
  );
}
