import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, createRef, forwardRef } from 'react';
import { RouterProvider } from 'react-aria';

import { Breadcrumb } from './breadcrumb.component.js';
import { BreadcrumbItem } from './components/breadcrumb-item/breadcrumb-item.component.js';

type CustomLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string | { pathname: string };
  prefetch?: boolean;
  replace?: boolean;
};

// Mimics next/link: accepts a UrlObject href and router-only props that must not reach the DOM
const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ href, prefetch, replace, ...props }, ref) => (
  <a
    ref={ref}
    href={typeof href === 'string' ? href : href.pathname}
    data-prefetch={prefetch}
    data-replace={replace}
    {...props}
  />
));

const CustomSpan = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>((props, ref) => (
  <span ref={ref} {...props} />
));

// Prevents jsdom "navigation not implemented" errors when clicking anchors
const preventNavigation = (e: React.MouseEvent) => e.preventDefault();

const withBasePath = (href: string) => `/base${href}`;

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

  it('renders items in a navigation landmark', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Personal</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  describe('with the default tag', () => {
    it('renders focusable span links and marks the last item as current', () => {
      render(
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Personal</BreadcrumbItem>
        </Breadcrumb>,
      );

      const home = screen.getByRole('link', { name: 'Home' });
      expect(home.tagName).toBe('SPAN');
      expect(home).toHaveAttribute('tabindex', '0');
      expect(home).not.toHaveAttribute('aria-current');

      const current = screen.getByRole('link', { name: 'Personal' });
      expect(current).toHaveAttribute('aria-current', 'page');
      expect(current).toHaveAttribute('aria-disabled', 'true');
      expect(current).not.toHaveAttribute('tabindex');
    });

    it('forwards the ref to the rendered element', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<BreadcrumbItem ref={ref}>Home</BreadcrumbItem>);

      expect(ref.current).toBe(screen.getByRole('link', { name: 'Home' }));
    });
  });

  describe('with tag="a"', () => {
    it('renders anchors with their href and marks the last item as current', () => {
      render(
        <Breadcrumb>
          <BreadcrumbItem tag="a" href="/home">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem tag="a" href="/personal">
            Personal
          </BreadcrumbItem>
          <BreadcrumbItem tag="a" href="/credit-cards">
            Credit cards
          </BreadcrumbItem>
        </Breadcrumb>,
      );

      const home = screen.getByRole('link', { name: 'Home' });
      expect(home.tagName).toBe('A');
      expect(home).toHaveAttribute('href', '/home');
      expect(home).not.toHaveAttribute('aria-current');
      expect(screen.getByRole('link', { name: 'Personal' })).toHaveAttribute('href', '/personal');

      const current = screen.getByText('Credit cards');
      expect(current.tagName).toBe('SPAN');
      expect(current).toHaveAttribute('aria-current', 'page');
      expect(current).toHaveAttribute('aria-disabled', 'true');
      expect(current).not.toHaveAttribute('href');
    });

    it('preserves anchor attributes', () => {
      render(
        <BreadcrumbItem tag="a" href="/document.pdf" target="_blank" rel="noreferrer" title="Opens in a new tab">
          Document
        </BreadcrumbItem>,
      );

      const link = screen.getByRole('link', { name: 'Document' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
      expect(link).toHaveAttribute('title', 'Opens in a new tab');
    });

    it('renders a disabled item as non-interactive text without anchor attributes', () => {
      render(
        <BreadcrumbItem tag="a" href="/home" target="_blank" isDisabled>
          Home
        </BreadcrumbItem>,
      );

      const item = screen.getByText('Home');
      expect(item.tagName).toBe('SPAN');
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).not.toHaveAttribute('href');
      expect(item).not.toHaveAttribute('target');
      expect(item).not.toHaveAttribute('tabindex');
    });

    it("applies RouterProvider's useHref to the href", () => {
      render(
        <RouterProvider navigate={vi.fn()} useHref={withBasePath}>
          <BreadcrumbItem tag="a" href="/home">
            Home
          </BreadcrumbItem>
        </RouterProvider>,
      );

      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/base/home');
    });

    it('forwards the ref to the anchor', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <BreadcrumbItem tag="a" href="/home" ref={ref}>
          Home
        </BreadcrumbItem>,
      );

      expect(ref.current).toBe(screen.getByRole('link', { name: 'Home' }));
    });

    it('calls onClick and onPress once when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn(preventNavigation);
      const onPress = vi.fn();

      render(
        <BreadcrumbItem tag="a" href="/home" onClick={onClick} onPress={onPress}>
          Home
        </BreadcrumbItem>,
      );

      await user.click(screen.getByRole('link', { name: 'Home' }));

      expect(onClick).toHaveBeenCalledOnce();
      expect(onPress).toHaveBeenCalledOnce();
    });

    it('does not call onPress when disabled', async () => {
      const user = userEvent.setup();
      const onPress = vi.fn();

      render(
        <BreadcrumbItem tag="a" href="/home" onPress={onPress} isDisabled>
          Home
        </BreadcrumbItem>,
      );

      await user.click(screen.getByText('Home'));

      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('with a custom component tag', () => {
    it('renders links and marks the last item as current', () => {
      render(
        <Breadcrumb>
          <BreadcrumbItem tag={CustomLink} href="/home">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem tag={CustomLink} href={{ pathname: '/personal' }}>
            Personal
          </BreadcrumbItem>
          <BreadcrumbItem tag={CustomLink} href="/credit-cards">
            Credit cards
          </BreadcrumbItem>
        </Breadcrumb>,
      );

      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
      expect(screen.getByRole('link', { name: 'Personal' })).toHaveAttribute('href', '/personal');

      const current = screen.getByText('Credit cards');
      expect(current.tagName).toBe('SPAN');
      expect(current).toHaveAttribute('aria-current', 'page');
      expect(current).toHaveAttribute('aria-disabled', 'true');
      expect(current).not.toHaveAttribute('href');
    });

    it('forwards component props and ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <BreadcrumbItem tag={CustomLink} ref={ref} href="/home" prefetch={false} replace data-testid="custom-link">
          Home
        </BreadcrumbItem>,
      );

      const link = screen.getByRole('link', { name: 'Home' });
      expect(link).toBe(screen.getByTestId('custom-link'));
      expect(link).toHaveAttribute('href', '/home');
      expect(link).toHaveAttribute('data-prefetch', 'false');
      expect(link).toHaveAttribute('data-replace', 'true');
      expect(ref.current).toBe(link);
    });

    it("passes the untransformed href to the component under RouterProvider's useHref", () => {
      render(
        <RouterProvider navigate={vi.fn()} useHref={withBasePath}>
          <BreadcrumbItem tag={CustomLink} href="/home">
            Home
          </BreadcrumbItem>
        </RouterProvider>,
      );

      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home');
    });

    it('renders a disabled item as non-interactive text without component props', () => {
      render(
        <BreadcrumbItem tag={CustomLink} href="/home" prefetch={false} isDisabled>
          Home
        </BreadcrumbItem>,
      );

      const item = screen.getByText('Home');
      expect(item.tagName).toBe('SPAN');
      expect(item).toHaveAttribute('aria-disabled', 'true');
      expect(item).not.toHaveAttribute('href');
      expect(item).not.toHaveAttribute('data-prefetch');
    });

    it('calls onClick once when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn(preventNavigation);

      render(
        <BreadcrumbItem tag={CustomLink} href="/home" onClick={onClick}>
          Home
        </BreadcrumbItem>,
      );

      await user.click(screen.getByRole('link', { name: 'Home' }));

      expect(onClick).toHaveBeenCalledOnce();
    });

    it('applies link semantics when elementType is a non-anchor element', async () => {
      const user = userEvent.setup();
      const onPress = vi.fn();

      render(
        <BreadcrumbItem tag={CustomSpan} elementType="span" onPress={onPress}>
          Home
        </BreadcrumbItem>,
      );

      const link = screen.getByRole('link', { name: 'Home' });
      expect(link.tagName).toBe('SPAN');
      expect(link).toHaveAttribute('tabindex', '0');

      await user.click(link);
      expect(onPress).toHaveBeenCalledOnce();
    });
  });
});
