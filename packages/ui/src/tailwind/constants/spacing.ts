import { createSpacing } from '../utils/create-spacing.js';

export const SPACING_LENGTH = 35;
export const SPACING_UNIT = 6;
export const SPACING_SCALE = 16;
export const ADD_MINOR_SCALE = true;

export const SPACING = createSpacing(SPACING_UNIT, SPACING_SCALE, ADD_MINOR_SCALE);
