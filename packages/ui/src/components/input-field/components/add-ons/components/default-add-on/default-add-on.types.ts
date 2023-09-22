import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { AddOnProps } from '../../add-ons.types.js';

import { styles } from './default-add-on.styles.js';

export type DefaultAddOnProps = AddOnProps & VariantProps<typeof styles> & HTMLAttributes<Element>;
