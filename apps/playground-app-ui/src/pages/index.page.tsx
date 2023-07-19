import { AccessibilityIcon, Button, SkipLink, VisuallyHidden, Well } from '@westpac/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useMemo } from 'react';

const COLORS = {
  background: [
    'bg-background',
    'bg-background-50',
    'bg-background-100',
    'bg-background-200',
    'bg-background-300',
    'bg-background-400',
    'bg-background-500',
    'bg-background-600',
    'bg-background-700',
    'bg-background-800',
    'bg-background-900',
  ],
  border: [
    'bg-border',
    'bg-border-50',
    'bg-border-100',
    'bg-border-200',
    'bg-border-300',
    'bg-border-400',
    'bg-border-500',
    'bg-border-600',
    'bg-border-700',
    'bg-border-800',
    'bg-border-900',
  ],
  borderDark: [
    'bg-borderDark',
    'bg-borderDark-50',
    'bg-borderDark-100',
    'bg-borderDark-200',
    'bg-borderDark-300',
    'bg-borderDark-400',
    'bg-borderDark-500',
    'bg-borderDark-600',
    'bg-borderDark-700',
    'bg-borderDark-800',
    'bg-borderDark-900',
  ],
  focus: [
    'bg-focus',
    'bg-focus-50',
    'bg-focus-100',
    'bg-focus-200',
    'bg-focus-300',
    'bg-focus-400',
    'bg-focus-500',
    'bg-focus-600',
    'bg-focus-700',
    'bg-focus-800',
    'bg-focus-900',
  ],
  heading: [
    'bg-heading',
    'bg-heading-50',
    'bg-heading-100',
    'bg-heading-200',
    'bg-heading-300',
    'bg-heading-400',
    'bg-heading-500',
    'bg-heading-600',
    'bg-heading-700',
    'bg-heading-800',
    'bg-heading-900',
  ],
  hero: [
    'bg-hero',
    'bg-hero-50',
    'bg-hero-100',
    'bg-hero-200',
    'bg-hero-300',
    'bg-hero-400',
    'bg-hero-500',
    'bg-hero-600',
    'bg-hero-700',
    'bg-hero-800',
    'bg-hero-900',
  ],
  light: [
    'bg-light',
    'bg-light-50',
    'bg-light-100',
    'bg-light-200',
    'bg-light-300',
    'bg-light-400',
    'bg-light-500',
    'bg-light-600',
    'bg-light-700',
    'bg-light-800',
    'bg-light-900',
  ],
  link: [
    'bg-link',
    'bg-link-50',
    'bg-link-100',
    'bg-link-200',
    'bg-link-300',
    'bg-link-400',
    'bg-link-500',
    'bg-link-600',
    'bg-link-700',
    'bg-link-800',
    'bg-link-900',
  ],
  muted: [
    'bg-muted',
    'bg-muted-50',
    'bg-muted-100',
    'bg-muted-200',
    'bg-muted-300',
    'bg-muted-400',
    'bg-muted-500',
    'bg-muted-600',
    'bg-muted-700',
    'bg-muted-800',
    'bg-muted-900',
  ],
  neutral: [
    'bg-neutral',
    'bg-neutral-50',
    'bg-neutral-100',
    'bg-neutral-200',
    'bg-neutral-300',
    'bg-neutral-400',
    'bg-neutral-500',
    'bg-neutral-600',
    'bg-neutral-700',
    'bg-neutral-800',
    'bg-neutral-900',
  ],
  pop: [
    'bg-pop',
    'bg-pop-50',
    'bg-pop-100',
    'bg-pop-200',
    'bg-pop-300',
    'bg-pop-400',
    'bg-pop-500',
    'bg-pop-600',
    'bg-pop-700',
    'bg-pop-800',
    'bg-pop-900',
  ],
  primary: [
    'bg-primary',
    'bg-primary-50',
    'bg-primary-100',
    'bg-primary-200',
    'bg-primary-300',
    'bg-primary-400',
    'bg-primary-500',
    'bg-primary-600',
    'bg-primary-700',
    'bg-primary-800',
    'bg-primary-900',
  ],
  text: [
    'bg-text',
    'bg-text-50',
    'bg-text-100',
    'bg-text-200',
    'bg-text-300',
    'bg-text-400',
    'bg-text-500',
    'bg-text-600',
    'bg-text-700',
    'bg-text-800',
    'bg-text-900',
  ],
  success: [
    'bg-success',
    'bg-success-50',
    'bg-success-100',
    'bg-success-200',
    'bg-success-300',
    'bg-success-400',
    'bg-success-500',
    'bg-success-600',
    'bg-success-700',
    'bg-success-800',
    'bg-success-900',
  ],
  info: [
    'bg-info',
    'bg-info-50',
    'bg-info-100',
    'bg-info-200',
    'bg-info-300',
    'bg-info-400',
    'bg-info-500',
    'bg-info-600',
    'bg-info-700',
    'bg-info-800',
    'bg-info-900',
  ],
  warning: [
    'bg-warning',
    'bg-warning-50',
    'bg-warning-100',
    'bg-warning-200',
    'bg-warning-300',
    'bg-warning-400',
    'bg-warning-500',
    'bg-warning-600',
    'bg-warning-700',
    'bg-warning-800',
    'bg-warning-900',
  ],
  danger: [
    'bg-danger',
    'bg-danger-50',
    'bg-danger-100',
    'bg-danger-200',
    'bg-danger-300',
    'bg-danger-400',
    'bg-danger-500',
    'bg-danger-600',
    'bg-danger-700',
    'bg-danger-800',
    'bg-danger-900',
  ],
  system: [
    'bg-system',
    'bg-system-50',
    'bg-system-100',
    'bg-system-200',
    'bg-system-300',
    'bg-system-400',
    'bg-system-500',
    'bg-system-600',
    'bg-system-700',
    'bg-system-800',
    'bg-system-900',
  ],
};
const SHADES = ['DEFAULT', 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const BRANDS = ['bom', 'bsa', 'stg', 'wbc', 'wbg', 'rams'];

const HomePage = () => {
  const router = useRouter();
  const selectedBrand = useMemo(() => router.query.brand ?? 'wbc', [router.query]);
  const handleChange = useCallback((ev: ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname: '/', query: { brand: ev.target.value } });
  }, []);

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center p-4" data-theme={selectedBrand}>
      <div className="flex flex-wrap gap-2">
        {['hero', 'primary', 'faint', 'link', null, 'hero-soft', 'primary-soft', 'faint-soft'].map(color => (
          <Button key={color} color={color}>
            Test button
          </Button>
        ))}
      </div>
      <Link href="#link" passHref legacyBehavior>
        <Button tag="a" color={{ initial: 'hero', lg: 'primary' }}>
          Responsive
        </Button>
      </Link>
      <Link href="#link" passHref legacyBehavior>
        <SkipLink>Only for screen reader until tabbed</SkipLink>
      </Link>
      <VisuallyHidden>Just screen reader can see it</VisuallyHidden>
      <Well className="my-2 block w-full">
        <h3>Well</h3>
      </Well>
      <AccessibilityIcon color="primary" size="medium" />
      <AccessibilityIcon color="success" size="xlarge" />
      <select value={selectedBrand} onChange={handleChange} className="border border-border p-2 pr-4">
        {BRANDS.map(brand => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-22" />
          {SHADES.map(shade => (
            <div key={shade} className="flex w-12 items-center justify-center rounded">
              {shade}
            </div>
          ))}
        </div>
        {Object.entries(COLORS).map(([color, shades]) => (
          <div key={color} className="flex items-center gap-2">
            <div className="flex h-7 w-22 flex-row items-center justify-end">
              <h3 className="text-right">{color}:</h3>
            </div>
            {shades.map(shade => {
              return (
                <div
                  key={shade}
                  className={`${shade} flex h-7 w-12 items-center justify-center rounded transition-colors`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className="typography-body-1 text-primary transition-colors">Typography body 1</p>
      <p className="typography-brand-1 font-normal text-primary transition-colors">Typography brand 1: Normal</p>
      <p className="typography-brand-1 font-semibold text-primary transition-colors">Typography brand 1: Semi-Bold</p>
      <p className="typography-brand-1 font-bold text-primary transition-colors">Typography brand: Bold</p>
      <p className="typography-brand-9 text-primary transition-colors">Brand</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dolorum dolor excepturi ab magnam sint soluta
        aliquam, recusandae assumenda blanditiis dolorem ratione cupiditate eligendi mollitia provident officia deleniti
        at nam.
      </p>
    </div>
  );
};
export default HomePage;
