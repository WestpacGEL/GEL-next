import { Meta } from '@storybook/react-vite';

import { MultiselectDropdown } from './multiselect-dropdown.component.js';

const meta: Meta<typeof MultiselectDropdown> = {
  title: 'Components/MultiselectDropdown',
  component: MultiselectDropdown,
};

export default meta;

export const Default = () => <MultiselectDropdown />;
