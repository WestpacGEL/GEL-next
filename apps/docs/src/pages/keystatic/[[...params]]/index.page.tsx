import { makePage } from '@keystatic/next/ui/app';

import config from '../../../keystatic.config';

export default makePage(config) as unknown as JSX.Element;
