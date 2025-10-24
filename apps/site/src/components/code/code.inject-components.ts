import Link from 'next/link';

export { clsx } from 'clsx';

export { DesktopComputerPictogram, DriversLicencePictogram } from '@westpac/ui/pictogram';

export { MastercardAcceptedSymbol, WBCLogo } from '@westpac/ui/symbol';

export { StaticCode } from '../static-code/index';

export { ComponentTitle } from '../document-renderer/component-title';

export * from '../country-flags/index';

export {
  Badge,
  Button,
  Well,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Select,
  Textarea,
  Tabs,
  TabsPanel,
  Accordion,
  AccordionItem,
  RadioGroup,
  RadioGroupRadio,
  CheckboxGroup,
  CheckboxGroupCheckbox,
  ButtonGroup,
  ButtonGroupButton,
  Switch,
  ProgressBar,
  Link,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  Collapsible,
  DatePicker,
  List,
  ListItem,
  ErrorMessage,
  FlexiCell,
  FlexiCellBody,
  FlexiCellFooter,
  FlexiCellAdornment,
  FlexiCellHint,
  FlexiCellLabel,
  FlexiCellButton,
  FlexiCellCircle,
  Circle,
  Autocomplete,
  AutocompleteItem,
  Panel,
  PanelBody,
  PanelFooter,
  ButtonDropdown,
  ButtonDropdownHeading,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Field,
  ProgressRope,
  VisuallyHidden,
  Pagination,
  Popover,
  Repeater,
  SkipLink,
  Compacta,
  CompactaItem,
  Selector,
  SelectorAdornment,
  SelectorBody,
  SelectorButton,
  SelectorCircle,
  SelectorFooter,
  SelectorHint,
  SelectorButtonOption,
  SelectorCheckbox,
  SelectorLabel,
  SelectorLink,
  SelectorRadio,
  Grid,
  GridItem,
  Heading,
  ProgressIndicator,
  BottomSheet,
  Header,
  Footer,
  GridContainer,
} from '@westpac/ui';

export * from '@westpac/ui/icon';

export { GiftPictogram } from '@westpac/ui/pictogram';
export { Link as NextLink };

export {
  IconSizesDemo,
  AutoAddressDemo,
  ManualAddress,
  InternationalAddress,
  ComplexAddressDemo,
  EmploymentAutocompletePattern,
  EmploymentSelectFullPattern,
  TaxFileNumberPattern,
} from './components/demos';
export { Hr, Body } from './components/utils';

/**
 * Export space related constants
 */
export const SPACING_UNIT = 6;

export const SPACING_SCALE = [
  { value: 0.5, className: 'pr-0.5' },
  { value: 1, className: 'pr-1' },
  { value: 2, className: 'pr-2' },
  { value: 3, className: 'pr-3' },
  { value: 4, className: 'pr-4' },
  { value: 5, className: 'pr-5' },
  { value: 6, className: 'pr-6' },
  { value: 7, className: 'pr-7' },
  { value: 8, className: 'pr-8' },
  { value: 9, className: 'pr-9' },
  { value: 10, className: 'pr-10' },
  { value: 11, className: 'pr-11' },
  { value: 12, className: 'pr-12' },
  { value: 13, className: 'pr-13' },
  { value: 14, className: 'pr-14' },
  { value: 15, className: 'pr-15' },
  { value: 16, className: 'pr-16' },
  { value: 17, className: 'pr-17' },
  { value: 18, className: 'pr-18' },
  { value: 19, className: 'pr-19' },
  { value: 20, className: 'pr-20' },
];
export const VARIATION_MARGIN_PADDING = ['', 'x', 'y', 't', 'r', 'b', 'l'];
export const SPACING_DEFAULT_CLASSES = 'h-3 w-0 bg-surface-info';

export { useBrand } from '@/app/design-system/hooks/use-brand';
export { useForm } from 'react-hook-form';
