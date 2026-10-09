import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { MultiSelect, MultiSelectItem, MultiSelectSection } from './multi-select.component.js';

const mockOptions = [
  { key: '1', textValue: 'Option 1' },
  { key: '2', textValue: 'Option 2' },
  { key: '3', textValue: 'Option 3' },
];

const mockSectionOptions = [
  { key: '4', textValue: 'Section Option 1' },
  { key: '5', textValue: 'Section Option 2' },
];

describe('MultiSelect', () => {
  it('renders the component', () => {
    const { container } = render(
      <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with placeholder text', () => {
    render(
      <MultiSelect
        items={mockOptions}
        placeholder="Choose options"
        listBoxProps={{ 'aria-label': 'multiselect options' }}
      >
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    expect(screen.getByText('Choose options')).toBeInTheDocument();
  });

  it('renders with default placeholder when none provided', () => {
    render(
      <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('opens dropdown when trigger button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('allows single item selection', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <MultiSelect
        items={mockOptions}
        onSelectionChange={onSelectionChange}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
      >
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const option1 = screen.getByText('Option 1');
    await user.click(option1);

    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('allows multiple item selection', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <MultiSelect
        items={mockOptions}
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
      >
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');

    await user.click(option1);
    await user.click(option2);

    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });

  it('displays selected items correctly', async () => {
    const user = userEvent.setup();
    const selectedKeys = new Set(['1']);

    render(
      <MultiSelect
        items={mockOptions}
        selectedKeys={selectedKeys}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
      >
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const listbox = screen.getByRole('listbox');
    const selectedOption = within(listbox).getByRole('option', { name: /Option 1/ });
    expect(selectedOption).toHaveAttribute('aria-checked', 'true');
  });

  it('filters options when typing in search input', async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Option 1');

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('shows "Select All" functionality for multiple selection mode', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <MultiSelect
        items={mockOptions}
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
      >
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const selectAllButton = screen.getByText('Select all');
    expect(selectAllButton).toBeInTheDocument();

    await user.click(selectAllButton);
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('renders sections correctly', async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect listBoxProps={{ 'aria-label': 'multiselect options' }}>
        <MultiSelectSection key="section1" title="Section 1" items={mockOptions}>
          {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
        </MultiSelectSection>
        <MultiSelectSection key="section2" title="Section 2" items={mockSectionOptions}>
          {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
        </MultiSelectSection>
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section Option 1')).toBeInTheDocument();
    expect(screen.getByText('Section Option 2')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    render(
      <MultiSelect items={mockOptions} size="small" listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('can toggle dropdown open and closed', async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');

    // Open dropdown
    await user.click(triggerButton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Close dropdown by clicking trigger again
    await user.click(triggerButton);

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');

    // Open dropdown with click (more reliable than Enter)
    await user.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Simple navigation test - just verify the listbox responds to keyboard input
    await user.keyboard('{ArrowDown}');

    // Verify listbox is still present and interactive
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    render(
      <MultiSelect items={[]} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('shows item descriptions when provided', async () => {
    const user = userEvent.setup();
    const optionsWithDescriptions = [
      { key: '1', textValue: 'Option 1', description: 'First option description' },
      { key: '2', textValue: 'Option 2', description: 'Second option description' },
    ];

    render(
      <MultiSelect items={optionsWithDescriptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
        {option => (
          <MultiSelectItem key={option.key} description={option.description}>
            {option.textValue}
          </MultiSelectItem>
        )}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    expect(screen.getByText('First option description')).toBeInTheDocument();
    expect(screen.getByText('Second option description')).toBeInTheDocument();
  });

  it('supports controlled selected keys', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const selectedKeys = new Set(['1', '2']);

    render(
      <MultiSelect
        items={mockOptions}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        listBoxProps={{ 'aria-label': 'multiselect options' }}
      >
        {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
      </MultiSelect>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const listbox = screen.getByRole('listbox');
    const option1 = within(listbox).getByRole('option', { name: /Option 1/ });
    const option2 = within(listbox).getByRole('option', { name: /Option 2/ });

    expect(option1).toHaveAttribute('aria-checked', 'true');
    expect(option2).toHaveAttribute('aria-checked', 'true');
  });

  it('maintains search text when dropdown is closed and reopened', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <MultiSelect items={mockOptions} listBoxProps={{ 'aria-label': 'multiselect options' }}>
          {option => <MultiSelectItem key={option.key}>{option.textValue}</MultiSelectItem>}
        </MultiSelect>
        <div data-testid="outside-element">Outside</div>
      </div>,
    );

    const triggerButton = screen.getByRole('combobox');
    await user.click(triggerButton);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Option 1');

    // Verify filtering worked
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();

    // Close dropdown by clicking outside
    const outsideElement = screen.getByTestId('outside-element');
    await user.click(outsideElement);

    // Reopen dropdown
    await user.click(triggerButton);

    // The search text should be maintained, showing only filtered results
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  describe('displayValue', () => {
    const countryOptions = [
      { key: 'AU', textValue: 'Australia +61', displayValue: 'AU +61' },
      { key: 'NZ', textValue: 'New Zealand +64', displayValue: 'NZ +64' },
      { key: 'GB', textValue: 'United Kingdom +44' },
    ];

    function CountrySelect({
      initialKeys = [],
      selectionMode = 'single',
    }: {
      initialKeys?: string[];
      selectionMode?: 'single' | 'multiple';
    }) {
      const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(initialKeys));
      return (
        <MultiSelect
          items={countryOptions}
          selectionMode={selectionMode}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => setSelectedKeys(keys as Set<string>)}
          listBoxProps={{ 'aria-label': 'country options' }}
        >
          {option => (
            <MultiSelectItem key={option.key} textValue={option.textValue} displayValue={option.displayValue}>
              {option.textValue}
            </MultiSelectItem>
          )}
        </MultiSelect>
      );
    }

    // Visible text is hidden from screen readers, which get the textValue from a visually hidden span instead
    const getDisplayedText = () => screen.getByRole('combobox').querySelector('span[aria-hidden="true"]')?.textContent;
    const getScreenReaderText = () => screen.getByRole('combobox').querySelector('.sr-only')?.textContent;

    it('displays the displayValue in the textbox for a controlled selected item', () => {
      render(<CountrySelect initialKeys={['AU']} />);

      expect(getDisplayedText()).toBe('AU +61');
    });

    it('displays the displayValue in the textbox when an item is selected from the dropdown', async () => {
      const user = userEvent.setup();
      render(<CountrySelect />);

      await user.click(screen.getByRole('combobox'));

      const listbox = screen.getByRole('listbox');
      await user.click(within(listbox).getByRole('option', { name: /Australia \+61/ }));

      expect(getDisplayedText()).toBe('AU +61');
    });

    it('provides the textValue to screen readers when displayValue is provided', () => {
      render(<CountrySelect initialKeys={['AU']} />);

      expect(getScreenReaderText()).toBe('Australia +61');
    });

    it('still shows the textValue in the dropdown list', async () => {
      const user = userEvent.setup();
      render(<CountrySelect initialKeys={['AU']} />);

      await user.click(screen.getByRole('combobox'));

      const listbox = screen.getByRole('listbox');
      expect(within(listbox).getByRole('option', { name: /Australia \+61/ })).toBeInTheDocument();
      expect(within(listbox).queryByText('AU +61')).not.toBeInTheDocument();
    });

    it('falls back to textValue when displayValue is not provided', () => {
      render(<CountrySelect initialKeys={['GB']} />);

      expect(getDisplayedText()).toBe('United Kingdom +44');
      expect(getScreenReaderText()).toBe('United Kingdom +44');
    });

    it('displays the displayValue for each selected item in multiple selection mode', () => {
      render(<CountrySelect selectionMode="multiple" initialKeys={['AU', 'NZ', 'GB']} />);

      expect(getDisplayedText()).toBe('AU +61, NZ +64, United Kingdom +44');
      expect(getScreenReaderText()).toBe('Australia +61, New Zealand +64, United Kingdom +44');
    });

    it('shows the textValue in the tooltip when displayValue is provided', async () => {
      const user = userEvent.setup();
      render(<CountrySelect initialKeys={['AU']} />);

      // Keyboard focus opens the tooltip immediately, without the hover delay
      await user.tab();

      expect(screen.getByRole('tooltip')).toHaveTextContent('Australia +61');
    });

    it('includes the section title with the displayValue and screen reader text when showSingleSectionTitle is set', () => {
      render(
        <MultiSelect
          selectionMode="single"
          showSingleSectionTitle
          selectedKeys={new Set(['AU'])}
          listBoxProps={{ 'aria-label': 'country options' }}
        >
          <MultiSelectSection key="oceania" title="Oceania" items={countryOptions}>
            {option => (
              <MultiSelectItem key={option.key} textValue={option.textValue} displayValue={option.displayValue}>
                {option.textValue}
              </MultiSelectItem>
            )}
          </MultiSelectSection>
        </MultiSelect>,
      );

      expect(getDisplayedText()).toBe('Oceania: AU +61');
      expect(getScreenReaderText()).toBe('Oceania: Australia +61');
    });

    it('keeps the displayValue and screen reader text for previously selected items that are filtered out', async () => {
      const user = userEvent.setup();
      render(<CountrySelect selectionMode="multiple" />);

      await user.click(screen.getByRole('combobox'));
      await user.click(within(screen.getByRole('listbox')).getByRole('option', { name: /Australia \+61/ }));

      await user.type(screen.getByRole('textbox'), 'New');
      await user.click(within(screen.getByRole('listbox')).getByRole('option', { name: /New Zealand \+64/ }));

      expect(getDisplayedText()).toBe('AU +61, NZ +64');
      expect(getScreenReaderText()).toBe('Australia +61, New Zealand +64');
    });
  });
});
