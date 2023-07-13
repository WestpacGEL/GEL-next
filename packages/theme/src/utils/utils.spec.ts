import { PluginAPI } from 'tailwindcss/types/config.js';

import {
  EXPECTED_COLORS,
  EXPECTED_FONT_SIZES_VARS,
  EXPECTED_ICONS,
  EXPECTED_SPACING,
  EXPECTED_TYPOGRAPHY,
  TEST_COLORS,
} from '../__mocks__/utils.contansts.js';

import {
  createFontSizes,
  createSpacing,
  generateColorShades,
  generateFontComponents,
  generateIconComponents,
} from './index.js';

const SHOULD_RETURNED = 'should return an expected output';

describe('Utils testing', () => {
  describe('Create spacing vars', () => {
    it(SHOULD_RETURNED, () => {
      const spacingValues = createSpacing(6, 16);
      expect(spacingValues).toEqual(EXPECTED_SPACING);
    });
  });

  describe('Create font sizes', () => {
    it(SHOULD_RETURNED, () => {
      const spacingValues = createFontSizes(['body', 'brand']);
      expect(spacingValues).toEqual(EXPECTED_FONT_SIZES_VARS);
    });
  });

  describe('Create color shades', () => {
    it(SHOULD_RETURNED, () => {
      const spacingValues = generateColorShades(TEST_COLORS);
      expect(spacingValues).toEqual(EXPECTED_COLORS);
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

  describe('Create icon components', () => {
    it(SHOULD_RETURNED, () => {
      const iconComponents = generateIconComponents({
        xsmall: 'w-2 h-2',
        small: 'w-3 h-3',
        medium: 'w-4 h-4',
      });
      expect(iconComponents).toEqual(EXPECTED_ICONS);
    });
  });
});
