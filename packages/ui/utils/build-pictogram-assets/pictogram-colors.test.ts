import { describe, expect, it } from 'vitest';

import { getPictogramColors } from './pictogram-colors.js';

describe('static pictogram brand allocation', () => {
  it('exports refreshed WBC and preserves the previous palette as WBCLEGACY', () => {
    expect(getPictogramColors('WBC')).toEqual({ base: '#990000', accent: '#da1710', mono: '#ffffff' });
    expect(getPictogramColors('WBCLEGACY')).toEqual({ base: '#1f1c4f', accent: '#da1710', mono: '#ffffff' });
  });
});
