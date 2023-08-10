import { NavItem } from './sidebar';

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    label: 'Components',
    children: [
      { href: '/components/button', label: 'Button' },
      { href: '/components/typography', label: 'Typography' },
      { href: '/components/colors', label: 'Colors' },
      { href: '/components/input', label: 'Input' },
      { href: '/components/select', label: 'Select' },
      { href: '/components/textarea', label: 'Textarea' },
      { href: '/components/breadcrumb', label: 'Breadcrumb' },
      { href: '/components/alert', label: 'Alert' },
      { href: '/components/radio-group', label: 'RadioGroup' },
      { href: '/components/tabs', label: 'Tabs' },
      { href: '/components/accordion', label: 'Accordion' },
      { href: '/components/icons', label: 'Icons' },
      { href: '/components/checkbox-group', label: 'CheckboxGroup' },
      { href: '/components/button-group', label: 'ButtonGroup' },
    ],
  },
];
