import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { AddOnProps } from '../../add-ons.types.js';

import { styles } from './text-add-on.styles.js';

export type TextAddOnProps = AddOnProps & VariantProps<typeof styles> & HTMLAttributes<Element>;
