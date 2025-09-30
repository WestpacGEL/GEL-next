'use client';

import * as React from 'react';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { mergeProps, useButton, useComboBox, useFilter, useFocusRing, useSearchField } from 'react-aria';
import { useComboBoxState, useSearchFieldState } from 'react-stately';

import { ClearIcon, SearchIcon } from '../icon/index.js';
import { ErrorMessage, Hint, Label, ProgressIndicator } from '../index.js';

import { styles as autocompleteStyles } from './autocomplete.styles.js';
import { type AutocompleteProps } from './autocomplete.types.js';
import { AutocompleteListBox, AutocompletePopover } from './components/index.js';

const STATIC_IS_OPEN_STATE = {
  isOpen: true,
  setOpen: () => {
    return;
  },
  open: () => {
    return;
  },
  close: () => {
    return;
  },
  toggle: () => {
    return;
  },
};

function Autocomplete<T extends object>(
  {
    size = 'medium',
    invalid = false,
    isDisabled,
    footer,
    portalContainer,
    errorMessage,
    hintMessage,
    noOptionsMessage,
    className,
    width = 'full',
    loadingState,
    comboBoxState,
    ...props
  }: AutocompleteProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { contains } = useFilter({ sensitivity: 'base' });
  const internalState = useComboBoxState({ isDisabled, ...props, defaultFilter: contains });
  const state = comboBoxState ?? internalState;
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isFocusVisible: isInputFocusVisible, focusProps: inputFocusProps } = useFocusRing();
  const inputRef = React.useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  React.useImperativeHandle(ref, () => inputRef.current!);
  const listBoxRef = React.useRef(null);
  const popoverRef = React.useRef(null);
  const { inputProps, listBoxProps, labelProps, descriptionProps, errorMessageProps } = useComboBox(
    {
      ...props,
      isDisabled,
      inputRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const { clearButton: clearButtonStyle, ...styles } = autocompleteStyles({
    width,
    isDisabled,
    isInputFocusVisible,
    size,
    invalid,
    isFocusVisible,
  });

  // Get props for the clear button from useSearchField
  const searchProps = {
    label: props.label,
    value: state.inputValue,
    onChange: (v: string) => state.setInputValue(v),
  };

  const searchState = useSearchFieldState(searchProps);
  const { clearButtonProps } = useSearchField(
    { ...searchProps, 'aria-label': props['aria-label'], 'aria-labelledby': props['aria-labelledby'] },
    searchState,
    inputRef,
  );
  const clearButtonRef = React.useRef(null);
  const { buttonProps } = useButton(clearButtonProps, clearButtonRef);
  const outerRef = React.useRef(null);

  const isNoOptionPopOverOpen = useMemo(() => {
    return !!(
      noOptionsMessage &&
      ((!state.isOpen && state.isFocused && searchProps.value.length > 0 && !state.selectedItem) ||
        (state.collection.size === 0 && searchProps.value.length > 0))
    );
  }, [
    noOptionsMessage,
    state.isOpen,
    state.isFocused,
    state.selectedItem,
    state.collection.size,
    searchProps.value.length,
  ]);

  return (
    <div className={styles.base({ className })}>
      {props.label && <Label {...labelProps}>{props.label}</Label>}
      {hintMessage && <Hint {...descriptionProps}>{hintMessage}</Hint>}
      {errorMessage && <ErrorMessage {...errorMessageProps} message={errorMessage} />}

      <div ref={outerRef} className={styles.outerWrapper()}>
        <div className={styles.iconWrapper()}>
          {loadingState ? (
            <ProgressIndicator size="small" color="muted" />
          ) : (
            <SearchIcon aria-hidden size="small" color="muted" />
          )}
        </div>
        <input
          {...mergeProps(inputProps, inputFocusProps)}
          ref={inputRef}
          className={styles.input()}
          aria-live="polite"
          aria-busy={loadingState}
        />

        <button
          {...mergeProps(buttonProps, focusProps)}
          //React Aria provides Esc key to clear the input field. But accessibility guidelines require clear button to be focused. So we are preventing the default behavior of Esc key.
          onKeyDown={() => false}
          tabIndex={0}
          ref={clearButtonRef}
          style={{ visibility: state.inputValue !== '' ? 'visible' : 'hidden' }}
          className={clearButtonStyle()}
        >
          <ClearIcon aria-hidden="true" color="muted" size="small" />
        </button>
      </div>
      {isNoOptionPopOverOpen && (
        <AutocompletePopover
          state={STATIC_IS_OPEN_STATE}
          isNonModal
          placement="bottom start"
          portalContainer={portalContainer}
          triggerRef={outerRef}
        >
          <div className="px-3 py-2">{noOptionsMessage}</div>
          {footer && <div className="border-t border-t-border px-3 py-2">{footer}</div>}
        </AutocompletePopover>
      )}
      {state.isOpen && (
        <AutocompletePopover
          popoverRef={popoverRef}
          triggerRef={outerRef}
          state={state}
          isNonModal
          placement="bottom start"
          portalContainer={portalContainer}
        >
          <AutocompleteListBox
            {...listBoxProps}
            autoFocus={listBoxProps.autoFocus as boolean | undefined}
            listBoxRef={listBoxRef}
            state={state}
          />
          {footer && <div className="border-t border-t-border px-3 py-2">{footer}</div>}
        </AutocompletePopover>
      )}
    </div>
  );
}

const _Autocomplete = forwardRef(Autocomplete) as unknown as { displayName: string } & (<T extends object>(
  props: AutocompleteProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
) => ReturnType<typeof Autocomplete>);

_Autocomplete.displayName = 'Autocomplete';

export { _Autocomplete as Autocomplete };
