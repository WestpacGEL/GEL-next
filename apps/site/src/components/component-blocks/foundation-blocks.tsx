import { Image } from '@/components/document-renderer';

import { Colors } from './colors/colors.component';
import { colors, colorsKeystatic } from './colors/colors.preview';
import {
  accessibilityDemo,
  accessibilityDemoKeystatic,
} from './components/accessibility-demo/accessibility-demo.preview';
import { AvailabilityContent } from './components/availability-content/availability-content.component';
import {
  availabilityContent,
  availabilityContentKeystatic,
} from './components/availability-content/availability-content.preview';
import { designSystemBodyImage, designSystemBodyImageKeystatic } from './components/design-system-body-image';
import { LinkList } from './components/link-list';
import { linkList, linkListKeystatic } from './components/link-list/link-list.preview';
import { shortCode, shortCodeKeystatic } from './components/short-code/short-code.preview';
import { Fonts } from './fonts/fonts.component';
import { fonts, fontsKeystatic } from './fonts/fonts.preview';
import { Icons } from './icons/icons.component';
import { icons, iconsKeystatic } from './icons/icons.preview';
import { Logos } from './logos/logos.component';
import { logos, logosKeystatic } from './logos/logos.preview';
import { Pictograms } from './pictograms/pictograms.component';
import { pictograms, pictogramsKeystatic } from './pictograms/pictograms.preview';
import { Symbols } from './symbols/symbols.component';
import { symbols, symbolsKeystatic } from './symbols/symbols.preview';

export const foundationBlocks = {
  colors,
  icons,
  logos,
  pictograms,
  fonts,
  symbols,
  designSystemBodyImage,
  linkList,
  shortCode,
  accessibilityDemo,
  availabilityContent,
};

export const foundationBlocksComponents = {
  fonts: () => <Fonts />,
  icons: () => <Icons />,
  logos: () => <Logos />,
  pictograms: () => <Pictograms />,
  symbols: () => <Symbols />,
  colors: (props: any) => <Colors palette={props.palette} />,
  linkList: LinkList,
  designSystemBodyImage: (props: any) => (
    <div className="mb-5 mt-1">
      <Image {...props} />
    </div>
  ),
  availabilityContent: (props: any) => <AvailabilityContent {...props} />,
};

export const foundationBlocksKeystatic = {
  Colors: colorsKeystatic,
  Icons: iconsKeystatic,
  Logos: logosKeystatic,
  pictograms: pictogramsKeystatic,
  fonts: fontsKeystatic,
  symbols: symbolsKeystatic,
  designSystemBodyImage: designSystemBodyImageKeystatic,
  linkList: linkListKeystatic,
  shortCode: shortCodeKeystatic,
  accessibilityDemo: accessibilityDemoKeystatic,
  AvailabilityContent: availabilityContentKeystatic,
};
