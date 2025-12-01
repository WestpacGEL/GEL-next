/**
 * jscodeshift script to replace old tokens with new tokens. You will need to install jscodeshift locally to run the script.
 *
 * Some tokens do not have a direct replacement and will be marked with [REPLACE_TOKEN].
 *
 * Usage:
 *   jscodeshift --parser=tsx -t ./update-tokens-codemod.cjs <path>
 */
module.exports = function transformer(file, api) {
  const tints = ['-5', '-10', '-20', '-30', '-40', '-50', '-60', '-70', '-80', '-90'];

  const generateBorderTokens = () => {
    const pieces = ['', '-l', '-r', '-t', '-b'];
    const colors = [
      'background',
      'muted',
      'borderDark',
      'focus',
      'heading',
      'hero',
      'light',
      'link',
      'neutral',
      'pop',
      'primary',
      'text',
      'success',
      'info',
      'warning',
      'danger',
      'system',
      'white',
      'black',
    ];

    const deprecatedColors = ['background', 'heading', 'light', 'link', 'neutral', 'pop', 'text', 'system', 'black'];

    const getColorToken = color => {
      switch (color) {
        case 'muted':
          return 'muted-soft';
        case 'borderDark':
          return 'muted-strong';
        case 'white':
          return 'mono';
        default:
          return color;
      }
    };

    const borderTokens = pieces.reduce((acc, currentPiece) => {
      return colors.reduce(
        (acc2, color) => ({
          ...acc2,
          [`border${currentPiece}-${color}`]: `border${currentPiece}-border-${getColorToken(color)}${deprecatedColors.includes(color) ? '[REPLACE_TOKEN]' : ''}`,
        }),
        acc,
      );
    }, []);

    return borderTokens;
  };

  const REPLACEMENTS = {
    'bg-background': 'bg-surface-muted-faint',
    'bg-border': 'bg-surface-muted-soft',
    'bg-borderDark': 'bg-surface-muted-strong',
    'bg-focus': 'bg-focus[REPLACE_TOKEN]',
    'bg-heading': 'bg-heading[REPLACE_TOKEN]',
    'bg-hero': 'bg-surface-hero',
    'bg-light': 'bg-surface-muted-faint',
    'bg-link': 'bg-surface-primary',
    'bg-muted': 'bg-surface-muted',
    'bg-neutral': 'bg-neutral[REPLACE_TOKEN]',
    'bg-pop': 'bg-surface-pop',
    'bg-primary': 'bg-surface-primary',
    'bg-primary-50': 'bg-surface-primary-faint',
    'bg-text': 'bg-surface-muted-vivid',
    'bg-success': 'bg-surface-success',
    'bg-info': 'bg-surface-info',
    'bg-warning': 'bg-surface-warning',
    'bg-danger': 'bg-surface-danger',
    'bg-system': 'bg-surface-system-error',
    'bg-black': 'bg-black[REPLACE_TOKEN]',
    'bg-white': 'bg-background-white-pale',
    'text-text': 'text-text-body',
    'text-black': 'text-black[REPLACE_TOKEN]',
    'text-background': 'text-background[REPLACE_TOKEN]',
    'text-border': 'text-border[REPLACE_TOKEN]',
    'text-borderDark': 'text-borderDark[REPLACE_TOKEN]',
    'text-focus': 'text-focus[REPLACE_TOKEN]',
    'text-heading': 'text-text-heading',
    'text-hero': 'text-text-hero',
    'text-light': 'text-light[REPLACE_TOKEN]',
    'text-link': 'text-text-link',
    'text-muted': 'text-text-muted',
    'text-neutral': 'text-neutral[REPLACE_TOKEN]',
    'text-pop': 'text-pop[REPLACE_TOKEN]',
    'text-primary': 'text-text-primary',
    'text-success': 'text-text-success',
    'text-info': 'text-text-info',
    'text-warning': 'text-text-warning',
    'text-danger': 'text-text-danger',
    'text-system': 'text-text-system-error',
    'text-white': 'text-text-mono',
    ...generateBorderTokens(),
    'border-border': 'border-border-muted-soft',
    'border-l-border': 'border-l-border-muted-soft',
    'border-r-border': 'border-r-border-muted-soft',
    'border-t-border': 'border-t-border-muted-soft',
    'border-b-border': 'border-b-border-muted-soft',
  };

  const TINTED_COLOURS = {};
  const j = api.jscodeshift;
  const root = j(file.source);

  Object.keys(REPLACEMENTS).forEach(key => {
    tints.forEach(tint => {
      TINTED_COLOURS[`${key}${tint}`] = `${key}${tint}[REPLACE_TOKEN]`;
    });
  });

  const FINAL_REPLACER = { ...TINTED_COLOURS, ...REPLACEMENTS };

  // Helper to replace in a string
  function replaceAllTokens(str) {
    return Object.entries(FINAL_REPLACER).reduce(
      (acc, [from, to]) => acc.replace(new RegExp(`\\b${from}(?!-)\\b`, 'g'), to),
      str,
    );
  }

  // Replace in string literals
  root
    .find(j.Literal)
    .filter(path => typeof path.node.value === 'string')
    .forEach(path => {
      const newValue = replaceAllTokens(path.node.value);
      if (newValue !== path.node.value) {
        path.node.value = newValue;
      }
    });

  // Replace in JSX attributes (className, etc)
  root
    .find(j.JSXAttribute)
    .filter(path => path.node.value && path.node.value.type === 'Literal')
    .forEach(path => {
      const newValue = replaceAllTokens(path.node.value.value);
      if (newValue !== path.node.value.value) {
        path.node.value.value = newValue;
      }
    });

  // Replace in template literals
  root.find(j.TemplateElement).forEach(path => {
    const newValue = replaceAllTokens(path.node.value.raw);
    if (newValue !== path.node.value.raw) {
      path.node.value.raw = newValue;
      path.node.value.cooked = newValue;
    }
  });

  return root.toSource({ quote: 'single' });
};
