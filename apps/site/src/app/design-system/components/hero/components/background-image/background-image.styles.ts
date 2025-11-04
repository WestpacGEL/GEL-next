import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: `
      pointer-events-none absolute z-0 hidden touch-none
      sm:block
    `, // hero
    header: `
      absolute -z-10
      sm:hidden
    `, //sticky header
  },
  variants: {
    brand: {
      wbc: {
        header: `
          inset-y-0 right-0
          sm:top-auto sm:h-[14.25rem]
        `,
      },
      wbg: {},
      stg: {
        base: 'bottom-0 left-0 w-[75.125rem]',
        header: `
          bottom-0 left-0 w-[37.5625rem]
          xsl:w-[75.125rem]
        `,
      },
      bsa: {
        base: 'right-0 bottom-0 w-[63.5rem]',
        header: `
          right-0 bottom-0 w-[31.75rem]
          xsl:w-[63.5rem]
        `,
      },
      bom: {},
      btfg: {},
      rams: {},
    },
    fixed: {
      true: { header: 'sm:block' },
    },
  },
});
