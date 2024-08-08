'use client';

import { useThemeStore } from '@/theme/theme.store';
import { BrandKey } from '@/theme/theme.types';

export function Card({ active, brand = 'wbc' }: { active?: boolean; brand?: BrandKey }) {
  const { themes, activeTheme, activeThemeKey, brandName } = useThemeStore();
  return (
    <li
      style={{ borderColor: activeTheme.border }}
      className="flex content-center justify-center gap-3 rounded border p-4"
    >
      <div
        style={{ backgroundColor: active ? activeTheme.primary : themes[brand].primary }}
        className="size-16 shrink-0 rounded-full"
      />
      <div>
        <h3 style={{ color: active ? activeTheme.hero : themes[brand].hero }} className="mb-2 text-xl font-bold">
          {active ? `Active brand: ${brandName[activeThemeKey]}` : brandName[brand]}
        </h3>
        <p style={{ color: active ? activeTheme.text : themes[brand].text }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
    </li>
  );
}
