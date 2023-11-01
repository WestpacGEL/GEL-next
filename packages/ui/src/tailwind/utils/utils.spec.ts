import { PluginAPI } from 'tailwindcss/types/config.js';

import {
  EXPECTED_COLORS,
  EXPECTED_FONT_SIZES_VARS,
  EXPECTED_SPACING,
  EXPECTED_TYPOGRAPHY,
  TEST_COLORS,
} from '../__mocks__/utils.constants.js';

import {
  createFontSizes,
  createSpacing,
  generateColorTints,
  generateFontComponents,
  generateFormControlComponents,
} from './index.js';

const SHOULD_RETURNED = 'should return an expected output';

describe('Utils testing', () => {
  describe('Create spacing vars', () => {
    it(SHOULD_RETURNED, () => {
      const spacingValues = createSpacing(6, 16, true);
      expect(spacingValues).toEqual(EXPECTED_SPACING);
    });
  });

  describe('Create font sizes', () => {
    it(SHOULD_RETURNED, () => {
      const fontValues = createFontSizes(['body', 'brand']);
      expect(fontValues).toEqual(EXPECTED_FONT_SIZES_VARS);
    });
  });

  describe('Create color shades', () => {
    it(SHOULD_RETURNED, () => {
      const colorValues = generateColorTints(TEST_COLORS);
      expect(colorValues).toEqual(EXPECTED_COLORS);
    });
  });

  describe('Create font components', () => {
    it(SHOULD_RETURNED, () => {
      const fontComponents = generateFontComponents(
        {
          1: {
            fontSize: '3.75rem',
            lineHeight: 'tight',
          },
          2: {
            fontSize: '3.375rem',
            lineHeight: 'tight',
          },
        },
        (() => 'MOCK') as PluginAPI['theme'],
      );
      expect(fontComponents).toEqual(EXPECTED_TYPOGRAPHY);
    });
  });

  describe('Create form control components', () => {
    it(SHOULD_RETURNED, () => {
      const fontComponents = generateFormControlComponents({
        base: 'form-control',
        sizes: {
          sm: 'text-sm',
        },
        disabled: 'bg-light',
      });
      expect(fontComponents).toEqual({
        '.form-control': {
          '@apply form-control': {},
        },
        '.form-control-disabled': {
          '@apply bg-light': {},
        },
        '.form-control-sm': {
          '@apply text-sm': {},
        },
        '.no-inner-spin-button::-webkit-outer-spin-button, .no-inner-spin-button::-webkit-inner-spin-button': {
          appearance: 'none',
          margin: '0',
        },
      });
    });
  });
});
