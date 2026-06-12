import { render, screen } from '@testing-library/react';

import { Field } from './field.component.js';

describe('Field', () => {
  it('renders the component', () => {
    const { container } = render(<Field aria-label="test" />);
    expect(container).toBeInTheDocument();
  });
});

it('renders a single error message', () => {
  render(<Field aria-label="test" errorMessage="Something went wrong" />);
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
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
