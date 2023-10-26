import { createReader } from '@keystatic/core/reader';

import keystaticConfig from '../../keystatic.config';

console.log('process.cwd()', process.cwd());
export const reader = createReader(process.cwd(), keystaticConfig);
