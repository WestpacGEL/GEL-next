import {
  EXPECTED_COLORS,
  EXPECTED_FONT_SIZES_VARS,
  EXPECTED_SPACING,
  TEST_COLORS,
} from '../__mocks__/utils.contansts.js';

import { createFontSizes, createSpacing, generateColorShades } from './index.js';

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
});
