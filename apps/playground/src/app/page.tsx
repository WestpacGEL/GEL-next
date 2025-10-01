'use client';

import { Card } from '@/components/card/card.component';
import { useThemeStore } from '@/theme/theme.store';
import { BrandKey } from '@/theme/theme.types';

export default function Home() {
  const { activeThemeKey, setTheme } = useThemeStore();
  return (
    <main data-brand="tokens-st-george" className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="flex w-1/2 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold">Select brand</label>
          <div className="w-[250px] h-[250px] bg-surface-primary" />
          <select value={activeThemeKey} onChange={e => setTheme(e.target.value as BrandKey)} className="border p-2">
            <option value="wbc">Westpac</option>
            <option value="stg">St. George</option>
            <option value="bom">Bank of Melbourne</option>
            <option value="bsa">BankSA</option>
          </select>
        </div>
        <Card active />
        <Card brand="wbc" />
        <Card brand="stg" />
        <Card brand="bom" />
        <Card brand="bsa" />
      </ul>
      <div style={{ backgroundColor: 'var(--color-background-pale-black)'}}>--color-background-pale-black</div>
      <div style={{ backgroundColor: 'var(--color-background-white-black)'}}>--color-background-white-black</div>
      <div style={{ backgroundColor: 'var(--color-background-white-faint)'}}>--color-background-white-faint</div>
      <div style={{ backgroundColor: 'var(--color-background-pale-faint)'}}>--color-background-pale-faint</div>
      <div style={{ backgroundColor: 'var(--color-background-white-pale)'}}>--color-background-white-pale</div>
      <div style={{ backgroundColor: 'var(--color-background-primary)'}}>--color-background-primary</div>
      <div style={{ backgroundColor: 'var(--color-background-hero)'}}>--color-background-hero</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted-vivid)'}}>--color-surface-muted-vivid</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted)'}}>--color-surface-muted</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted-strong)'}}>--color-surface-muted-strong</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted-mild)'}}>--color-surface-muted-mild</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted-soft)'}}>--color-surface-muted-soft</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted-pale)'}}>--color-surface-muted-pale</div>
      <div style={{ backgroundColor: 'var(--color-surface-muted-faint)'}}>--color-surface-muted-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-primary)'}}>--color-surface-primary</div>
      <div style={{ backgroundColor: 'var(--color-surface-primary-faint)'}}>--color-surface-primary-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-hero)'}}>--color-surface-hero</div>
      <div style={{ backgroundColor: 'var(--color-surface-hero-faint)'}}>--color-surface-hero-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-pop)'}}>--color-surface-pop</div>
      <div style={{ backgroundColor: 'var(--color-surface-pop-faint)'}}>--color-surface-pop-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-holler)'}}>--color-surface-holler</div>
      <div style={{ backgroundColor: 'var(--color-surface-holler-faint)'}}>--color-surface-holler-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-sing)'}}>--color-surface-sing</div>
      <div style={{ backgroundColor: 'var(--color-surface-sing-faint)'}}>--color-surface-sing-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-dance)'}}>--color-surface-dance</div>
      <div style={{ backgroundColor: 'var(--color-surface-dance-faint)'}}>--color-surface-dance-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-success)'}}>--color-surface-success</div>
      <div style={{ backgroundColor: 'var(--color-surface-success-faint)'}}>--color-surface-success-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-info)'}}>--color-surface-info</div>
      <div style={{ backgroundColor: 'var(--color-surface-info-faint)'}}>--color-surface-info-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-warning)'}}>--color-surface-warning</div>
      <div style={{ backgroundColor: 'var(--color-surface-warning-faint)'}}>--color-surface-warning-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-danger)'}}>--color-surface-danger</div>
      <div style={{ backgroundColor: 'var(--color-surface-danger-faint)'}}>--color-surface-danger-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-system-error)'}}>--color-surface-system-error</div>
      <div style={{ backgroundColor: 'var(--color-surface-system-error-dark)'}}>--color-surface-system-error-dark</div>
      <div style={{ backgroundColor: 'var(--color-surface-mono)'}}>--color-surface-mono</div>
      <div style={{ backgroundColor: 'var(--color-surface-reversed)'}}>--color-surface-reversed</div>
      <div style={{ backgroundColor: 'var(--color-text-body)'}}>--color-text-body</div>
      <div style={{ backgroundColor: 'var(--color-text-heading)'}}>--color-text-heading</div>
      <div style={{ backgroundColor: 'var(--color-text-muted)'}}>--color-text-muted</div>
      <div style={{ backgroundColor: 'var(--color-text-primary)'}}>--color-text-primary</div>
      <div style={{ backgroundColor: 'var(--color-text-hero)'}}>--color-text-hero</div>
      <div style={{ backgroundColor: 'var(--color-text-holler)'}}>--color-text-holler</div>
      <div style={{ backgroundColor: 'var(--color-text-link)'}}>--color-text-link</div>
      <div style={{ backgroundColor: 'var(--color-text-success)'}}>--color-text-success</div>
      <div style={{ backgroundColor: 'var(--color-text-info)'}}>--color-text-info</div>
      <div style={{ backgroundColor: 'var(--color-text-warning)'}}>--color-text-warning</div>
      <div style={{ backgroundColor: 'var(--color-text-danger)'}}>--color-text-danger</div>
      <div style={{ backgroundColor: 'var(--color-text-system-error)'}}>--color-text-system-error</div>
      <div style={{ backgroundColor: 'var(--color-text-mono)'}}>--color-text-mono</div>
      <div style={{ backgroundColor: 'var(--color-text-reversed)'}}>--color-text-reversed</div>
      <div style={{ backgroundColor: 'var(--color-border-muted)'}}>--color-border-muted</div>
      <div style={{ backgroundColor: 'var(--color-border-muted-strong)'}}>--color-border-muted-strong</div>
      <div style={{ backgroundColor: 'var(--color-border-muted-mild)'}}>--color-border-muted-mild</div>
      <div style={{ backgroundColor: 'var(--color-border-muted-soft)'}}>--color-border-muted-soft</div>
      <div style={{ backgroundColor: 'var(--color-border-hero)'}}>--color-border-hero</div>
      <div style={{ backgroundColor: 'var(--color-border-primary)'}}>--color-border-primary</div>
      <div style={{ backgroundColor: 'var(--color-border-pop)'}}>--color-border-pop</div>
      <div style={{ backgroundColor: 'var(--color-border-holler)'}}>--color-border-holler</div>
      <div style={{ backgroundColor: 'var(--color-border-sing)'}}>--color-border-sing</div>
      <div style={{ backgroundColor: 'var(--color-border-dance)'}}>--color-border-dance</div>
      <div style={{ backgroundColor: 'var(--color-border-success)'}}>--color-border-success</div>
      <div style={{ backgroundColor: 'var(--color-border-success-mild)'}}>--color-border-success-mild</div>
      <div style={{ backgroundColor: 'var(--color-border-info)'}}>--color-border-info</div>
      <div style={{ backgroundColor: 'var(--color-border-info-mild)'}}>--color-border-info-mild</div>
      <div style={{ backgroundColor: 'var(--color-border-warning)'}}>--color-border-warning</div>
      <div style={{ backgroundColor: 'var(--color-border-warning-mild)'}}>--color-border-warning-mild</div>
      <div style={{ backgroundColor: 'var(--color-border-danger)'}}>--color-border-danger</div>
      <div style={{ backgroundColor: 'var(--color-border-danger-mild)'}}>--color-border-danger-mild</div>
      <div style={{ backgroundColor: 'var(--color-border-mono)'}}>--color-border-mono</div>
      <div style={{ backgroundColor: 'var(--color-border-focus)'}}>--color-border-focus</div>
      <div style={{ backgroundColor: 'var(--color-data-a-solid)'}}>--color-data-a-solid</div>
      <div style={{ backgroundColor: 'var(--color-data-a-tint)'}}>--color-data-a-tint</div>
      <div style={{ backgroundColor: 'var(--color-data-a-opacity)'}}>--color-data-a-opacity</div>
      <div style={{ backgroundColor: 'var(--color-data-b-solid)'}}>--color-data-b-solid</div>
      <div style={{ backgroundColor: 'var(--color-data-b-tint)'}}>--color-data-b-tint</div>
      <div style={{ backgroundColor: 'var(--color-data-b-opacity)'}}>--color-data-b-opacity</div>
      <div style={{ backgroundColor: 'var(--color-data-c-solid)'}}>--color-data-c-solid</div>
      <div style={{ backgroundColor: 'var(--color-data-c-tint)'}}>--color-data-c-tint</div>
      <div style={{ backgroundColor: 'var(--color-data-c-opacity)'}}>--color-data-c-opacity</div>
      <div style={{ backgroundColor: 'var(--color-data-d-solid)'}}>--color-data-d-solid</div>
      <div style={{ backgroundColor: 'var(--color-data-d-tint)'}}>--color-data-d-tint</div>
      <div style={{ backgroundColor: 'var(--color-data-d-opacity)'}}>--color-data-d-opacity</div>
      <div style={{ backgroundColor: 'var(--color-data-e-solid)'}}>--color-data-e-solid</div>
      <div style={{ backgroundColor: 'var(--color-data-e-tint)'}}>--color-data-e-tint</div>
      <div style={{ backgroundColor: 'var(--color-data-e-opacity)'}}>--color-data-e-opacity</div>
      <div style={{ backgroundColor: 'var(--color-data-f-solid)'}}>--color-data-f-solid</div>
      <div style={{ backgroundColor: 'var(--color-data-f-tint)'}}>--color-data-f-tint</div>
      <div style={{ backgroundColor: 'var(--color-data-f-opacity)'}}>--color-data-f-opacity</div>
      <div style={{ backgroundColor: 'var(--color-surface-pictogram-base)'}}>--color-surface-pictogram-base</div>
      <div style={{ backgroundColor: 'var(--color-surface-pictogram-accent)'}}>--color-surface-pictogram-accent</div>
      <div style={{ backgroundColor: 'var(--color-surface-hover-primary)'}}>--color-surface-hover-primary</div>
      <div style={{ backgroundColor: 'var(--color-surface-active-primary)'}}>--color-surface-active-primary</div>
      <div style={{ backgroundColor: 'var(--color-surface-hover-hero)'}}>--color-surface-hover-hero</div>
      <div style={{ backgroundColor: 'var(--color-surface-active-hero)'}}>--color-surface-active-hero</div>
      <div style={{ backgroundColor: 'var(--color-surface-hover-primary-faint)'}}>--color-surface-hover-primary-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-active-primary-faint)'}}>--color-surface-active-primary-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-hover-hero-faint)'}}>--color-surface-hover-hero-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-active-hero-faint)'}}>--color-surface-active-hero-faint</div>
      <div style={{ backgroundColor: 'var(--color-surface-hover-muted-pale)'}}>--color-surface-hover-muted-pale</div>
      <div style={{ backgroundColor: 'var(--color-surface-active-muted-pale)'}}>--color-surface-active-muted-pale</div>
      <div style={{ backgroundColor: 'var(--color-surface-hover-mono)'}}>--color-surface-hover-mono</div>
      <div style={{ backgroundColor: 'var(--color-surface-active-mono)'}}>--color-surface-active-mono</div>
      <div style={{ backgroundColor: 'var(--border-rounded-none)'}}>--border-rounded-none</div>
      <div style={{ backgroundColor: 'var(--border-rounded-sm)'}}>--border-rounded-sm</div>
      <div style={{ backgroundColor: 'var(--border-rounded-md)'}}>--border-rounded-md</div>
      <div style={{ backgroundColor: 'var(--border-rounded-lg)'}}>--border-rounded-lg</div>
      <div style={{ backgroundColor: 'var(--border-rounded-xl)'}}>--border-rounded-xl</div>
      <div style={{ backgroundColor: 'var(--border-rounded-2xl)'}}>--border-rounded-2xl</div>
      <div style={{ backgroundColor: 'var(--border-rounded-3xl)'}}>--border-rounded-3xl</div>
      <div style={{ backgroundColor: 'var(--border-rounded-4xl)'}}>--border-rounded-4xl</div>
      <div style={{ backgroundColor: 'var(--border-rounded-5xl)'}}>--border-rounded-5xl</div>
      <div style={{ backgroundColor: 'var(--border-rounded-full)'}}>--border-rounded-full</div>
    </main>
  );
}
