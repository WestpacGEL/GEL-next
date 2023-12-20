export const generateLinearLoader = () => {
  return {
    '.linear-gradient-style': {
      '@apply overflow-hidden flex bg-background': {},
      '&::before': {
        '@apply translate-x-0 block w-full h-full animate-skeleton': {},
        content: '""',
        background: `linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.7) 50%,
          rgba(255, 255, 255, 0) 100%
        );`,
      },
    },
  };
};
