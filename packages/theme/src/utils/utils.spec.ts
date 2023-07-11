import { EXPECTED_SPACING } from '../__mocks__/utils.contansts.js';

import { createSpacing } from './index.js';

const SHOULD_RETURNED = 'should return an expected output';

describe('Utils testing', () => {
  describe('Create spacing vars', () => {
    it(SHOULD_RETURNED, () => {
      const spacingValues = createSpacing(6, 16);
      expect(spacingValues).toEqual(EXPECTED_SPACING);
    });
  });
});
