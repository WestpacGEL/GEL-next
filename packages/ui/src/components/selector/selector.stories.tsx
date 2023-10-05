import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PersonIcon } from '../icon/index.js';
import { VisuallyHidden } from '../index.js';
import { BusPictogram, ChatPictogram, PizzaPictogram } from '../pictogram/index.js';

import { Selector } from './selector.component.js';

const HERE_IS_A_LABEL_A = 'Here is a label A';
const HERE_IS_A_LABEL_B = 'Here is a label B';
const HERE_IS_A_LABEL_C = 'Here is a label C';

const meta: Meta<typeof Selector> = {
  title: 'Example/Selector',
  component: Selector,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory = () => {
  return (
    <Selector type="checkbox">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Checkbox key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > Radio usage example
 */
export const RadioStory = () => {
  return (
    <Selector type="radio">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Radio key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.Radio>
      ))}
    </Selector>
  );
};

/**
 * > Radio usage example
 */
export const CheckWithArrowStory = () => {
  return (
    <Selector type="radio">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Radio key={key} body value={key} isDisabled={disabled} checkIcon="arrow">
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.Radio>
      ))}
    </Selector>
  );
};

/**
 * > Radio with state usage example
 */
export const RadioWithStateStory = () => {
  const [selectedOption, setSelectedOption] = useState<string>();
  return (
    <>
      {selectedOption}
      <Selector
        type="radio"
        value={selectedOption}
        onChange={value => {
          setSelectedOption(value);
        }}
      >
        {[
          { key: 'A', disabled: false },
          { key: 'B', disabled: false },
          { key: 'C', disabled: false },
          { key: 'D', disabled: true },
        ].map(({ key, disabled }) => (
          <Selector.Radio key={key} body value={key} isDisabled={disabled}>
            <Selector.Label>Something {key}</Selector.Label>
          </Selector.Radio>
        ))}
      </Selector>
    </>
  );
};

/**
 * > Check options with state usage example
 */
export const CheckboxWithStateStory = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>();
  return (
    <>
      {selectedOptions?.join(',')}
      <Selector
        type="checkbox"
        value={selectedOptions}
        onChange={value => {
          setSelectedOptions(value);
        }}
      >
        {[
          { key: 'A', disabled: false },
          { key: 'B', disabled: false },
          { key: 'C', disabled: false },
          { key: 'D', disabled: true },
        ].map(({ key, disabled }) => (
          <Selector.Checkbox key={key} body value={key} isDisabled={disabled}>
            <Selector.Label>Something {key}</Selector.Label>
          </Selector.Checkbox>
        ))}
      </Selector>
    </>
  );
};

/**
 * > Default usage example
 */
export const LongTextStory = () => {
  return (
    <Selector type="checkbox">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Checkbox key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores architecto eum aperiam consectetur
            quibusdam. Laboriosam saepe, explicabo odio quis doloribus consequuntur quae et necessitatibus quasi
            similique. Debitis non quo recusandae. {key}
          </Selector.Label>
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > With hint text usage example
 */
export const WithHintTextStory = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          label: HERE_IS_A_LABEL_A,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: false,
        },
        {
          label: HERE_IS_A_LABEL_B,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: false,
        },
        { label: HERE_IS_A_LABEL_C, hint: '', key: 'C', disabled: false },
      ].map(({ key, disabled, hint, label }) => (
        <Selector.Checkbox key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > With pictogram usage example
 */
export const WithPictogramStory = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PizzaPictogram className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <ChatPictogram className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <BusPictogram className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          hint: '',
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <Selector.Checkbox before={before} key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > With pictogram with different sizes usage example
 */
export const WithPictogramDifferentSizesStory = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PizzaPictogram className="h-15 w-15" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <ChatPictogram className="h-10 w-10" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <BusPictogram className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          hint: '',
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <Selector.Checkbox before={before} key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > With icon and different size
 */
export const WithIconsDifferentSizesStory = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-15 w-15" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-10 w-10" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          hint: '',
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <Selector.Checkbox before={before} key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > With icon and secondary label
 */
export const WithIconsAndSecondaryLabelStory = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          after: (
            <Selector.Adornment align="center">
              <span>$200,000.00</span>
            </Selector.Adornment>
          ),
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 7643123
            </>
          ),
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before, after }) => (
        <Selector.Checkbox before={before} after={after} key={key} body value={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > Radio example with icons and secondary text
 */
export const RadioWithIconsAndSecondaryLabelStory = () => {
  return (
    <Selector type="radio">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          after: (
            <Selector.Adornment align="center">
              <span>$200,000.00</span>
            </Selector.Adornment>
          ),
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 7643123
            </>
          ),
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before, after }) => (
        <Selector.Radio
          before={before}
          after={after}
          key={key}
          body
          value={key}
          checkIcon="arrow"
          isDisabled={disabled}
        >
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Radio>
      ))}
    </Selector>
  );
};

/**
 * > Disable state style example
 */
export const DisableStateStory = () => {
  return (
    <Selector type="radio" value="A">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'A',
          disabled: true,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 123456
            </>
          ),
          key: 'B',
          disabled: true,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon className="h-5 w-5" />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          after: (
            <Selector.Adornment align="center">
              <span>$200,000.00</span>
            </Selector.Adornment>
          ),
          hint: (
            <>
              <VisuallyHidden>Bank Account</VisuallyHidden>
              123-456 7643123
            </>
          ),
          key: 'C',
          disabled: true,
        },
      ].map(({ key, disabled, hint, label, before, after }) => (
        <Selector.Radio
          before={before}
          after={after}
          key={key}
          body
          value={key}
          checkIcon="arrow"
          isDisabled={disabled}
        >
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Radio>
      ))}
    </Selector>
  );
};
