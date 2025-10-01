import { Image } from '@/components/document-renderer';

import { Colors } from './colors/colors.component';
import { colors } from './colors/colors.preview';
import { accessibilityDemo } from './components/accessibility-demo/accessibility-demo.preview';
import { AvailabilityContent } from './components/availability-content/availability-content.component';
import { availabilityContent } from './components/availability-content/availability-content.preview';
import { designSystemBodyImage } from './components/design-system-body-image';
import { LinkList } from './components/link-list';
import { linkList } from './components/link-list/link-list.preview';
import { shortCode } from './components/short-code/short-code.preview';
import { Fonts } from './fonts/fonts.component';
import { fonts } from './fonts/fonts.preview';
import { Icons } from './icons/icons.component';
import { icons } from './icons/icons.preview';
import { Logos } from './logos/logos.component';
import { logos } from './logos/logos.preview';
import { Pictograms } from './pictograms/pictograms.component';
import { pictograms } from './pictograms/pictograms.preview';
import { Symbols } from './symbols/symbols.component';
import { symbols } from './symbols/symbols.preview';

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
  fonts: (props: any) => <Fonts {...props} />,
  icons: () => <Icons />,
  logos: () => <Logos />,
  pictograms: () => <Pictograms />,
  symbols: () => <Symbols />,
  colors: (props: { palette: string }) => <Colors palette={props.palette} />,
  linkList: LinkList,
  designSystemBodyImage: (props: any) => (
    <div className="mt-1 mb-5">
      <Image {...props} />
    </div>
  ),
  availabilityContent: (props: any) => <AvailabilityContent {...props} />,
};
