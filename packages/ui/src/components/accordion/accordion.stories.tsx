import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { Button, Tabs } from '../index.js';

import { Accordion } from './accordion.component.js';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => {
      /**
       * NOTE:
       * Needed to change displayName here so subcomponent shows correct name in code view
       * Could not change it on the component as Item from react-stately is used in three components
       * and one displayName would overwrite the others
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Accordion.Item.displayName = 'Accordion.Item';

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    rounded: true,
    children: [
      { key: 'files', title: 'My files' },
      { key: 'shared', title: 'Shared with us' },
      { key: 'last', title: 'Last item' },
    ].map(({ key, title }) => (
      <Accordion.Item key={key} title={title}>
        <h3>{title}</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat in, nobis itaque iste sequi, pariatur, nam
          reiciendis quasi illum nulla aliquid mollitia corrupti nostrum incidunt? At minima error nobis ullam!
        </p>
        <Button>Test</Button>
      </Accordion.Item>
    )),
  },
};

/**
 * > Lego look using Hero color
 */
export const LegoLook: Story = {
  args: {
    look: 'lego',
    rounded: false,
  },
  render: ({ ...props }) => (
    <Accordion {...props}>
      {[
        { key: 'files', title: 'My files' },
        { key: 'shared', title: 'my shared with you' },
        { key: 'last', title: 'Last item' },
      ].map(({ key, title }) => (
        <Accordion.Item key={key} title={title}>
          <p>{title}</p>
          <Button>Test</Button>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
};

/**
 * > Controlled example
 */
export const Controlled: Story = {
  args: {
    look: 'lego',
    rounded: false,
  },
  render: ({ ...props }) => {
    const [expandedKeys, setExpandedKeys] = useState<Set<Key>>();
    return (
      <Accordion
        {...props}
        expandedKeys={expandedKeys}
        onExpandedChange={keys => {
          setExpandedKeys(keys);
        }}
      >
        {[
          { key: 'files', title: 'Your files' },
          { key: 'shared', title: 'Shared with you' },
          { key: 'last', title: 'Last item' },
        ].map(({ key, title }) => (
          <Accordion.Item key={key} title={title}>
            <p>{title}</p>
            <Button>Test</Button>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
};

/**
 * > Example showing how you can use styling to change accordion to tabs responsively.
 * > Replicates GEL Tabcordion functionality.
 * NOTE: Due to how items work the Accordion.Item that are children of Tabs should be Tab.Panel but can't due to name sharing on this page.
 * See the source of this example in, https://github.com/WestpacGEL/GEL-next/blob/main/packages/ui/src/components/accordion/accordion.stories.tsx#L142
 */
export const Responsive: Story = {
  render: ({ ...props }) => {
    const data = [
      { key: 'files', title: 'First Item', content: 'First Accordion content...' },
      { key: 'shared', title: 'Second Item', content: 'Second Accordion content...' },
      { key: 'last', title: 'Third Item', content: 'Third Accordion content...' },
    ];
    return (
      <>
        <Accordion {...props} className="sm:hidden">
          {data.map(({ key, title, content }) => (
            <Accordion.Item key={key} title={title}>
              <p>{content}</p>
            </Accordion.Item>
          ))}
        </Accordion>
        <Tabs className="max-sm:hidden">
          {data.map(({ key, title, content }) => (
            <Tabs.Panel key={key} title={title}>
              <p>{content}</p>
            </Tabs.Panel>
          ))}
        </Tabs>
      </>
    );
  },
};
