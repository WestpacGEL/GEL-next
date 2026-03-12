'use client';

import throttle from 'lodash.throttle';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
import { ArrowLeftIcon, HamburgerMenuIcon } from '../icon/index.js';
import { Button, SkipLink } from '../index.js';
import {
  BOMMultibrandLargeLogo,
  BOMMultibrandSmallLogo,
  BSAMultibrandLargeLogo,
  BSAMultibrandSmallLogo,
  STGMultibrandLargeLogo,
  STGMultibrandSmallLogo,
  SymbolProps,
  WBCMultibrandLargeLogo,
  WBCMultibrandSmallLogo,
} from '../symbol/index.js';

import { styles as headerStyles } from './header.styles.js';
import { type HeaderProps } from './header.types.js';

const LOGO_MAP = {
  wbc: {
    logo: (props: SymbolProps) => <WBCMultibrandSmallLogo {...props} />,
    largeLogo: (props: SymbolProps) => <WBCMultibrandLargeLogo {...props} />,
  },
  stg: {
    logo: (props: SymbolProps) => <STGMultibrandSmallLogo {...props} />,
    largeLogo: (props: SymbolProps) => <STGMultibrandLargeLogo {...props} />,
  },
  bom: {
    logo: (props: SymbolProps) => <BOMMultibrandSmallLogo {...props} />,
    largeLogo: (props: SymbolProps) => <BOMMultibrandLargeLogo {...props} />,
  },
  bsa: {
    logo: (props: SymbolProps) => <BSAMultibrandSmallLogo {...props} />,
    largeLogo: (props: SymbolProps) => <BSAMultibrandLargeLogo {...props} />,
  },
} as const;

export function Header({
  anchorTarget,
  brand,
  className,
  children,
  disableLogoLink = false,
  fixed = false,
  fixedMaxWidth,
  isScrolled,
  leftIcon,
  leftOnClick,
  leftAssistiveText,
  logoAssistiveText,
  logoLink = '#',
  logoCenter = false,
  logoOnClick,
  skipLinkContent = 'Skip to main content',
  skipToContentId,
  ...props
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = throttle(() => {
    let hasScrolled = false;
    if (window.scrollY > 5) {
      hasScrolled = true;
    }
    setScrolled(hasScrolled);
  }, 10);

  useEffect(() => {
    if (fixed) window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fixed, handleScroll]);

  const logoAlignment = logoCenter ? 'center' : 'left';

  const finalBrand = useMemo(() => {
    // Due to brands like 'wbc-light' and 'stg-light'
    return brand.split('-')[0] as keyof typeof LOGO_MAP;
  }, [brand]);

  const SmallLogo = LOGO_MAP[finalBrand].logo;
  const LargeLogo = LOGO_MAP[finalBrand].largeLogo;

  const ButtonIcon = leftIcon === 'arrow' ? ArrowLeftIcon : HamburgerMenuIcon;

  const breakpoint = useBreakpoint();

  const styles = headerStyles({
    logoCenter: resolveResponsiveVariant(logoCenter, breakpoint),
    fixed: resolveResponsiveVariant(fixed, breakpoint),
    leftIcon: resolveResponsiveVariant(leftIcon, breakpoint),
    scrolled: isScrolled || scrolled,
  });

  const HeaderLogo = useCallback(
    () => (
      <>
        <SmallLogo align={logoAlignment} aria-label={logoAssistiveText} className={styles.smallLogo()} />
        <LargeLogo aria-label={logoAssistiveText} className={styles.largeLogo()} />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [logoAlignment, logoAssistiveText, LargeLogo, SmallLogo],
  );

  const defaultAssistiveText = leftIcon === 'arrow' ? 'Back' : 'Menu';

  return (
    <header className={styles.base({ className })} {...props}>
      <div className={styles.inner()} style={{ maxWidth: fixed ? fixedMaxWidth : undefined }}>
        {skipToContentId && <SkipLink href={skipToContentId}>{skipLinkContent}</SkipLink>}
        {leftIcon && (
          <div className={styles.leftContent()}>
            <Button
              look="link"
              iconAfter={ButtonIcon}
              iconSize={leftIcon === 'arrow' ? 'medium' : 'small'}
              onClick={leftOnClick}
              aria-label={leftAssistiveText ?? defaultAssistiveText}
              className={styles.leftButton()}
              iconColor="muted-vivid"
            />
          </div>
        )}
        {/* useFocusRing was causing this link to need two clicks to activate so focus-visible styling is used instead */}
        {disableLogoLink ? (
          <div className={styles.logoLink()}>
            <HeaderLogo />
          </div>
        ) : (
          <a href={logoLink} target={anchorTarget} className={styles.logoLink()} onClick={logoOnClick}>
            <HeaderLogo />
          </a>
        )}
        {children && <div className={styles.rightContent()}>{children}</div>}
      </div>
    </header>
  );
}
