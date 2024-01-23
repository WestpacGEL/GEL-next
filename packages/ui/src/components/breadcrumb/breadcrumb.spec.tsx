import { render } from '@testing-library/react';

import { Breadcrumb } from './breadcrumb.component.js';
import { BreadcrumbItem } from './components/breadcrumb-item/breadcrumb-item.component.js';

describe('Breadcrumb', () => {
  it('renders the component', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbItem isDisabled>Item 2</BreadcrumbItem>
        <BreadcrumbItem>Item 3</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(container).toBeInTheDocument();
  });
});
