import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { AtmIcon, CarIcon, EmailIcon, PersonIcon, SettingsIcon, WatchIcon } from '../icon/index.js';
import {
  SelectorAdornment,
  SelectorButtonOption,
  SelectorCheckbox,
  SelectorHint,
  SelectorLabel,
  SelectorLink,
  SelectorRadio,
  VisuallyHidden,
} from '../index.js';
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
        <SelectorCheckbox key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>Something {key}</SelectorLabel>
        </SelectorCheckbox>
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
        <SelectorRadio key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>Something {key}</SelectorLabel>
        </SelectorRadio>
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
        <SelectorLink href="#" key={key} isDisabled={disabled}>
          <SelectorLabel>Something {key}</SelectorLabel>
        </SelectorLink>
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
        <SelectorButtonOption key={key} id={key} isDisabled={disabled}>
          <SelectorLabel>Something {key}</SelectorLabel>
        </SelectorButtonOption>
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
          <SelectorRadio key={key} value={key} isDisabled={disabled}>
            <SelectorLabel>Something {key}</SelectorLabel>
          </SelectorRadio>
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
          <SelectorCheckbox key={key} value={key} isDisabled={disabled}>
            <SelectorLabel>Something {key}</SelectorLabel>
          </SelectorCheckbox>
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
        <SelectorCheckbox key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores architecto eum aperiam consectetur
            quibusdam. Laboriosam saepe, explicabo odio quis doloribus consequuntur quae et necessitatibus quasi
            similique. Debitis non quo recusandae. {key}
          </SelectorLabel>
        </SelectorCheckbox>
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
        <SelectorCheckbox key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorCheckbox>
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
            <SelectorAdornment align="top">
              <PizzaPictogram className="size-5" />
            </SelectorAdornment>
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
            <SelectorAdornment align="top">
              <ChatPictogram className="size-5" />
            </SelectorAdornment>
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
            <SelectorAdornment align="top">
              <BusPictogram className="size-5" />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_C,
          hint: '',
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <SelectorCheckbox before={before} key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorCheckbox>
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
            <SelectorAdornment align="top">
              <PizzaPictogram className="size-15" />
            </SelectorAdornment>
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
            <SelectorAdornment align="top">
              <ChatPictogram className="size-10" />
            </SelectorAdornment>
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
            <SelectorAdornment align="top">
              <BusPictogram className="size-5" />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_C,
          hint: '',
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <SelectorCheckbox before={before} key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorCheckbox>
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
            <SelectorAdornment align="top">
              <PersonIcon size="xlarge" />
            </SelectorAdornment>
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
            <SelectorAdornment align="top">
              <PersonIcon size="large" />
            </SelectorAdornment>
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
            <SelectorAdornment align="top">
              <PersonIcon size="medium" />
            </SelectorAdornment>
          ),
          label: 'Medium Icon',
          hint: '',
          key: 'C',
          disabled: false,
        },
        {
          before: (
            <SelectorAdornment align="top">
              <PersonIcon size="small" />
            </SelectorAdornment>
          ),
          label: 'Small Icon',
          hint: '',
          key: 'D',
          disabled: false,
        },
        {
          before: (
            <SelectorAdornment align="top">
              <PersonIcon size="xsmall" />
            </SelectorAdornment>
          ),
          label: 'Xsmall Icon',
          hint: '',
          key: 'E',
          disabled: false,
        },
        {
          before: (
            <SelectorAdornment align="top">
              <PersonIcon size={{ initial: 'xsmall', sm: 'xlarge', md: 'large', lg: 'medium', xl: 'small' }} />
            </SelectorAdornment>
          ),
          label: 'Responsive Icon',
          hint: '',
          key: 'F',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before }) => (
        <SelectorCheckbox before={before} key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorCheckbox>
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
            <SelectorAdornment align="top">
              <PersonIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <SelectorLabel>$200,000.00</SelectorLabel>,
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
            <SelectorAdornment align="top">
              <AtmIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <SelectorLabel>$200,000.00</SelectorLabel>,
          key: 'B',
          disabled: false,
        },
        {
          before: (
            <SelectorAdornment align="top">
              <CarIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_C,
          key: 'C',
          disabled: false,
        },
      ].map(({ key, disabled, hint, label, before, after }) => (
        <SelectorCheckbox before={before} after={after} key={key} value={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorCheckbox>
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
            <SelectorAdornment align="top">
              <SettingsIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <SelectorLabel>$10,000.00</SelectorLabel>,
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
            <SelectorAdornment align="top">
              <WatchIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <SelectorLabel>$200,000.00</SelectorLabel>,
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
            <SelectorAdornment align="top">
              <EmailIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_C,
          after: (
            <SelectorAdornment align="center">
              <span>$200,000.00</span>
            </SelectorAdornment>
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
        <SelectorButtonOption before={before} after={after} key={key} id={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorButtonOption>
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
            <SelectorAdornment align="top">
              <PersonIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_A,
          after: <SelectorLabel>$200,000.00</SelectorLabel>,
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
            <SelectorAdornment align="top">
              <PersonIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_B,
          after: <SelectorLabel>$200,000.00</SelectorLabel>,
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
            <SelectorAdornment align="top">
              <PersonIcon />
            </SelectorAdornment>
          ),
          label: HERE_IS_A_LABEL_C,
          after: (
            <SelectorAdornment align="center">
              <span>$200,000.00</span>
            </SelectorAdornment>
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
        <SelectorButtonOption before={before} after={after} key={key} id={key} isDisabled={disabled}>
          <SelectorLabel>{label}</SelectorLabel>
          {hint && <SelectorHint>{hint}</SelectorHint>}
        </SelectorButtonOption>
      ))}
    </Selector>
  );
};
