import { Meta } from '@storybook/react-vite';

import { Select } from '../select/select.component.js';

import { Tooltip } from './tooltip.component.js';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;

export const Default = () => {
  return (
    <Tooltip tooltip="Test tooltip">
      <Select>
        <option>Test</option>
      </Select>
    </Tooltip>
  );
};
