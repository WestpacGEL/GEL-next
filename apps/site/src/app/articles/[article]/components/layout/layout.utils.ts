export const layoutMap: { [key: number]: { span: object; start: { [index: number]: object } } } = {
  // body
  4: {
    span: {
      initial: 12,
      xsl: 5,
      md: 4,
    },
    start: {
      0: {
        inital: 1,
        xsl: 2,
        md: 3,
      },
      1: {
        initial: 1,
        xsl: 7,
      },
    },
  },
  //body-wide
  5: {
    span: {
      initial: 12,
      xsl: 5,
    },
    start: {
      0: {
        initial: 1,
        xsl: 2,
      },
      1: {
        intial: 1,
        xsl: 7,
      },
    },
  },
};
