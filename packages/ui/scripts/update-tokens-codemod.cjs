/**
 * jscodeshift script to replace old tokens with new tokens. You will need to install jscodeshift locally to run the script.
 *
 * Some tokens do not have a direct replacement and will be marked with [REPLACE TOKEN].
 *
 * Usage:
 *   jscodeshift --parser=tsx -t ./update-tokens-codemod.cjs <path>
 */
module.exports = function transformer(file, api) {
  const tints = ['-5', '-10', '-20', '-30', '-40', '-50', '-60', '-70', '-80', '-90'];
  const REPLACEMENTS = {
    'bg-background': 'bg-surface-muted',
    'bg-border': 'bg-surface-muted-soft',
    'bg-borderDark': 'bg-surface-muted-strong',
    'bg-focus': 'bg-focus[REPLACE TOKEN]',
    'bg-heading': 'bg-heading[REPLACE TOKEN]',
    'bg-hero': 'bg-surface-hero',
    'bg-light': 'bg-surface-muted-faint',
    'bg-link': 'bg-surface-primary',
    'bg-muted': 'bg-surface-muted',
    'bg-neutral': 'bg-neutral[REPLACE TOKEN]',
    'bg-pop': 'bg-surface-pop',
    'bg-primary': 'bg-surface-primary',
    'bg-text': 'bg-surface-muted-vivid',
    'bg-success': 'bg-surface-success',
    'bg-info': 'bg-surface-info',
    'bg-warning': 'bg-surface-warning',
    'bg-danger': 'bg-surface-danger',
    'bg-system': 'bg-surface-system-error',
    'text-text': 'text-text-body',
    'text-background': 'text-background[REPLACE TOKEN]',
    'text-border': 'text-border[REPLACE TOKEN]',
    'text-borderDark': 'text-borderDark[REPLACE TOKEN]',
    'text-focus': 'text-focus[REPLACE TOKEN]',
    'text-heading': 'text-text-heading',
    'text-hero': 'text-text-hero',
    'text-light': 'text-light[REPLACE TOKEN]',
    'text-link': 'text-text-link',
    'text-muted': 'text-text-muted',
    'text-neutral': 'text-neutral[REPLACE TOKEN]',
    'text-pop': 'text-pop[REPLACE TOKEN]',
    'text-primary': 'text-text-primary',
    'text-success': 'text-text-success',
    'text-info': 'text-text-info',
    'text-warning': 'text-text-warning',
    'text-danger': 'text-text-danger',
    'text-system': 'text-text-system-error',
    'border-border': 'border-muted-soft',
    'border-background': 'border-background[REPLACE TOKEN]',
    'border-borderDark': 'border-muted-strong',
    'border-focus': 'border-border-focus',
    'border-heading': 'border-heading[REPLACE TOKEN]',
    'border-hero': 'border-border-hero',
    'border-light': 'border-light[REPLACE TOKEN]',
    'border-link': 'border-link[REPLACE TOKEN]',
    'border-muted': 'border-border-muted',
    'border-neutral': 'border-neutral[REPLACE TOKEN]',
    'border-pop': 'border-pop[REPLACE TOKEN]',
    'border-primary': 'border-border-primary',
    'border-text': 'border-text[REPLACE TOKEN]',
    'border-success': 'border-border-success',
    'border-info': 'border-border-info',
    'border-warning': 'border-border-warning',
    'border-danger': 'border-border-danger',
    'border-system': 'border-system[REPLACE TOKEN]',
  };

  const BLACK_AND_WHITE = {
    'bg-black': 'bg-black[REPLACE TOKEN]',
    'bg-white': 'bg-white[REPLACE TOKEN]',
    'text-black': 'text-black[REPLACE TOKEN]',
    'text-white': 'text-white[REPLACE TOKEN]',
    'border-black': 'border-black[REPLACE TOKEN]',
    'border-white': 'border-border-mono',
  };

  const TINTED_COLOURS = {};
  const j = api.jscodeshift;
  const root = j(file.source);

  Object.keys(REPLACEMENTS).forEach(key => {
    tints.forEach(tint => {
      TINTED_COLOURS[`${key}${tint}`] = `${key}${tint}[REPLACE TOKEN]`;
    });
  });

  const FINAL_REPLACER = { ...TINTED_COLOURS, ...REPLACEMENTS, ...BLACK_AND_WHITE };

  // Helper to replace in a string
  function replaceAllTokens(str) {
    return Object.entries(FINAL_REPLACER).reduce(
      (acc, [from, to]) => acc.replace(new RegExp(`\\b${from}\\b`, 'g'), to),
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
