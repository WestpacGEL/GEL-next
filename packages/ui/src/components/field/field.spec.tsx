import { render, screen, waitFor, within } from '@testing-library/react';

import { Field } from './field.component.js';

describe('Field', () => {
  it('renders the component', () => {
    const { container } = render(<Field aria-label="test" />);
    expect(container).toBeInTheDocument();
  });

  it('renders a single error message', () => {
    const { container } = render(<Field aria-label="test" errorMessage="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(container.querySelector('[aria-live]')).not.toBeInTheDocument();
  });

  it('keeps only the visible error in a persistent live region and preserves the input description', async () => {
    const renderField = (errorMessage?: string | string[]) => (
      <Field
        label="Name"
        hintMessage="Use your legal name"
        errorTitle="Please check your name:"
        errorMessage={errorMessage}
        announceError
      >
        <input />
      </Field>
    );
    const { container, rerender } = render(renderField());
    const liveRegion = container.querySelector('[aria-live="polite"]');
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(liveRegion).toBeEmptyDOMElement();
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');

    rerender(renderField('Enter your name'));
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(screen.getAllByText('Enter your name')).toHaveLength(1);
    expect(liveRegion).toContainElement(screen.getByText('Enter your name'));
    expect(screen.getByText('Enter your name')).toBeVisible();
    expect(liveRegion).not.toContainElement(input);
    expect(liveRegion).not.toContainElement(screen.getByText('Name'));
    expect(liveRegion).not.toContainElement(screen.getByText('Use your legal name'));
    // Match the hint and error without depending on how the environment exposes SVG icon metadata.
    await waitFor(() => expect(input).toHaveAccessibleDescription(/^Use your legal name .*Enter your name$/));

    rerender(renderField(['Enter your first name', 'Enter your last name']));
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(screen.queryByText('Enter your name')).not.toBeInTheDocument();
    expect(liveRegion).toContainElement(screen.getByText('Please check your name:'));
    const list = screen.getByRole('list');
    expect(liveRegion).toContainElement(list);
    expect(
      within(list)
        .getAllByRole('listitem')
        .map(item => item.textContent),
    ).toEqual(['Enter your first name', 'Enter your last name']);
    await waitFor(() =>
      expect(input).toHaveAccessibleDescription(
        /^Use your legal name .*Please check your name: Enter your first name Enter your last name$/,
      ),
    );

    rerender(renderField());
    expect(container.querySelector('[aria-live="polite"]')).toBe(liveRegion);
    expect(liveRegion).toBeEmptyDOMElement();
    await waitFor(() => expect(input).toHaveAccessibleDescription('Use your legal name'));
  });

  it('renders a list of error messages', () => {
    render(<Field aria-label="test" errorMessage={['Error one', 'Error two']} />);
    expect(screen.getByText('Error one')).toBeInTheDocument();
    expect(screen.getByText('Error two')).toBeInTheDocument();
  });

  it('renders error title text and the errors in bullet form', () => {
    render(
      <Field
        aria-label="test"
        errorTitle="Please fix the following:"
        errorMessage={['Name is required', 'Email is required']}
      />,
    );
    expect(screen.getByText('Please fix the following:')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('does not render error title with a single error message', () => {
    render(<Field aria-label="test" errorTitle="Please fix the following:" errorMessage="Something went wrong" />);
    expect(screen.queryByText('Please fix the following:')).not.toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
