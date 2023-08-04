import { HamburgerMenuIcon } from '@westpac/ui';
import React, { useEffect, useState } from 'react';

import { styles as headerStyles } from './header.styles';
import { HeaderProps } from './header.types';

export function Header({ brand, className, title, ...props }: HeaderProps) {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const isFixed = window.scrollY >= 260;
        setFixed(isFixed);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  const styles = headerStyles({ brand, fixed, className });

  return (
    <header className={styles.base()}>
      <button className={styles.hamburgerButton()} onClick={props.onMenuButtonClick}>
        <HamburgerMenuIcon color="white" className="mx-auto" />
      </button>
      <h2 className={styles.title()}>{title}</h2>
    </header>
  );
}
