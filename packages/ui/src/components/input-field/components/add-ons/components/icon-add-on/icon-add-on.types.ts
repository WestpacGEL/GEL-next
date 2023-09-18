import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { type AddOnProps } from '../../add-ons.types.js';

import { styles } from './icon-add-on.styles.js';

export type IconAddOnProps = AddOnProps & VariantProps<typeof styles> & HTMLAttributes<Element>;
