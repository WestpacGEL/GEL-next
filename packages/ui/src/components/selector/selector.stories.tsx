import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { AtmIcon, CarIcon, EmailIcon, PersonIcon, SettingsIcon, WatchIcon } from '../icon/index.js';
import { VisuallyHidden } from '../index.js';
import { BusPictogram, ChatPictogram, PizzaPictogram } from '../pictogram/index.js';

import { Selector } from './selector.component.js';

const HERE_IS_A_LABEL_A = 'Here is a label A';
const HERE_IS_A_LABEL_B = 'Here is a label B';
const HERE_IS_A_LABEL_C = 'Here is a label C';

const meta: Meta<typeof Selector> = {
  title: 'Components/Selector',
  component: Selector,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

/**
 * > Default usage example
 */
export const Default = () => {
  return (
    <Selector type="checkbox">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Checkbox key={key} value={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > Radio usage example
 */
export const Radio = () => {
  return (
    <Selector type="radio">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Radio key={key} value={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.Radio>
      ))}
    </Selector>
  );
};

/**
 * > Link usage example
 */
export const Link = () => {
  return (
    <Selector type="link">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Link href="#" key={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.Link>
      ))}
    </Selector>
  );
};

/**
 * > Button usage example
 */
export const Button = () => {
  return (
    <Selector type="button">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.ButtonOption key={key} id={key} isDisabled={disabled}>
          <Selector.Label>Something {key}</Selector.Label>
        </Selector.ButtonOption>
      ))}
    </Selector>
  );
};

/**
 * > Radio with state usage example
 */
export const RadioWithState = () => {
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
          <Selector.Radio key={key} value={key} isDisabled={disabled}>
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
export const CheckboxWithState = () => {
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
          <Selector.Checkbox key={key} value={key} isDisabled={disabled}>
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
export const LongText = () => {
  return (
    <Selector type="checkbox">
      {[
        { key: 'A', disabled: false },
        { key: 'B', disabled: false },
        { key: 'C', disabled: false },
        { key: 'D', disabled: true },
      ].map(({ key, disabled }) => (
        <Selector.Checkbox key={key} value={key} isDisabled={disabled}>
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
export const HintText = () => {
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
        <Selector.Checkbox key={key} value={key} isDisabled={disabled}>
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
export const Pictogram = () => {
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
        <Selector.Checkbox before={before} key={key} value={key} isDisabled={disabled}>
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
export const PictogramSizes = () => {
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
        <Selector.Checkbox before={before} key={key} value={key} isDisabled={disabled}>
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
export const IconsSizes = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon size="xlarge" />
            </Selector.Adornment>
          ),
          label: 'Xlarge Icon',
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
              <PersonIcon size="large" />
            </Selector.Adornment>
          ),
          label: 'Large Icon',
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
              <PersonIcon size="medium" />
            </Selector.Adornment>
          ),
          label: 'Medium Icon',
          hint: '',
          key: 'C',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon size="small" />
            </Selector.Adornment>
          ),
          label: 'Small Icon',
          hint: '',
          key: 'D',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon size="xsmall" />
            </Selector.Adornment>
          ),
          label: 'Xsmall Icon',
          hint: '',
          key: 'E',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon size={{ initial: 'xsmall', sm: 'xlarge', md: 'large', lg: 'medium', xl: 'small' }} />
            </Selector.Adornment>
          ),
          label: 'Responsive Icon',
          hint: '',
          key: 'F',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <Selector.Checkbox before={before} key={key} value={key} isDisabled={disabled}>
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
export const IconsAndSecondaryLabel = () => {
  return (
    <Selector type="checkbox">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon />
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
              <AtmIcon />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <Selector.Label>$200,000.00</Selector.Label>,
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <Selector.Adornment align="top">
              <CarIcon />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_C,
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before, after }) => (
        <Selector.Checkbox before={before} after={after} key={key} value={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.Checkbox>
      ))}
    </Selector>
  );
};

/**
 * > Button example with icons and secondary text
 */
export const ButtonsWithIconsAndSecondaryLabel = () => {
  return (
    <Selector type="button">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <SettingsIcon />
            </Selector.Adornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <Selector.Label>$10,000.00</Selector.Label>,
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
              <WatchIcon />
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
              <EmailIcon />
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
        <Selector.ButtonOption before={before} after={after} key={key} id={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.ButtonOption>
      ))}
    </Selector>
  );
};

/**
 * > Disable state style example
 */
export const Disabled = () => {
  return (
    <Selector type="button" value="A">
      {[
        {
          before: (
            <Selector.Adornment align="top">
              <PersonIcon />
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
              <PersonIcon />
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
              <PersonIcon />
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
        <Selector.ButtonOption before={before} after={after} key={key} id={key} isDisabled={disabled}>
          <Selector.Label>{label}</Selector.Label>
          {hint && <Selector.Hint>{hint}</Selector.Hint>}
        </Selector.ButtonOption>
      ))}
    </Selector>
  );
};
