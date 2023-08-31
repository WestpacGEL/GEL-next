import { NavItem } from './sidebar.component';

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { href: '/design-system', label: 'Home' },
  {
    label: 'Components',
    children: [
      { href: '/design-system/components/button', label: 'Button' },
      { href: '/design-system/components/typography', label: 'Typography' },
      { href: '/design-system/components/colors', label: 'Colors' },
      { href: '/design-system/components/input', label: 'Input' },
      { href: '/design-system/components/select', label: 'Select' },
      { href: '/design-system/components/textarea', label: 'Textarea' },
      { href: '/design-system/components/breadcrumb', label: 'Breadcrumb' },
      { href: '/design-system/components/alert', label: 'Alert' },
      { href: '/design-system/components/radio-group', label: 'RadioGroup' },
      { href: '/design-system/components/tabs', label: 'Tabs' },
      { href: '/design-system/components/accordion', label: 'Accordion' },
      { href: '/design-system/components/icons', label: 'Icons' },
      { href: '/design-system/components/checkbox-group', label: 'CheckboxGroup' },
      { href: '/design-system/components/button-group', label: 'ButtonGroup' },
    ],
  },
];
