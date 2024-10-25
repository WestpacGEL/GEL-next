import { tv } from 'tailwind-variants';

export const styles = tv(
  {
    slots: {
      base: 'flex-none bg-white',
      inner:
        'mx-auto flex w-full flex-1 border border-x-0 border-t-0 border-b-[#E8E8ED] bg-white text-left transition-[border-bottom-width] duration-200 will-change-[border-bottom-width] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] max-sm:h-9 max-sm:px-2 sm:h-11 sm:px-4',
      logoLink: 'inline-flex items-center focus-visible:focus-outline',
      smallLogo: 'sm:hidden',
      largeLogo: 'max-sm:hidden',
      leftContent: 'flex items-center',
      leftButton:
        'my-1 border-r border-[#E8E8ED] p-0 rounded-none max-sm:-ml-2 max-sm:mr-2 max-sm:h-7 max-sm:min-w-[2.625rem] sm:-ml-4 sm:mr-3 sm:h-[3.3125rem] sm:min-w-[3.75rem]',
      rightContent: 'ml-auto flex items-center',
    },
    variants: {
      logoCenter: {
        true: {
          logoLink:
            'max-sm:absolute max-sm:left-1/2 max-sm:z-0 max-sm:translate-x-[-50%] max-sm:translate-y-[15%] sm:relative',
          smallLogo: '',
        },
        false: {
          logoLink: 'relative',
        },
      },
      fixed: {
        true: {
          base: '',
          inner: 'fixed inset-x-0 top-0 z-10',
        },
      },
      leftIcon: {
        arrow: {
          leftButton: '',
        },
        hamburger: {
          leftButton: 'sm:hidden',
        },
      },
      scrolled: {
        true: {
          inner: '',
        },
      },
    },
    compoundVariants: [
      {
        fixed: true,
        scrolled: true,
        className: { inner: 'border-b-0 after:opacity-100' },
      },
    ],
  },
  { responsiveVariants: ['xsl', 'sm', 'md', 'lg', 'xl'] },
);
