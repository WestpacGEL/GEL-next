/* eslint-disable better-tailwindcss/no-unregistered-classes */
import { type Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ALL_BRANDS } from '@westpac/style-config/tokens';

const meta: Meta = {
  title: 'Foundation/Colours',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

const brandMap = {
  WBC: 'Westpac',
  STG: 'StGeorge',
  BOM: 'Bank of Melbourne',
  BSA: 'Bank SA',
};
export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to generate Tailwind CSS color classes for all color tokens across all brands
function generateLoadColors() {
  const loadColors: Record<string, string[]> = {};

  // Get all unique color categories across all brands
  const allColorCategories = new Set<string>();

  // Iterate through all brands to collect color categories
  Object.values(ALL_BRANDS.Tokens).forEach(brand => {
    if (brand['light-mode']?.color) {
      Object.keys(brand['light-mode'].color).forEach(category => {
        allColorCategories.add(category);
      });
    }
  });

  // For each category, collect all unique token names
  allColorCategories.forEach(category => {
    const tokenNames = new Set<string>();

    Object.values(ALL_BRANDS.Tokens).forEach(brand => {
      const colorSection = brand['light-mode']?.color as Record<string, Record<string, unknown>> | undefined;
      if (colorSection?.[category]) {
        Object.keys(colorSection[category]).forEach(tokenName => {
          tokenNames.add(tokenName);
        });
      }
    });

    // Convert to bg- classes
    loadColors[category] = Array.from(tokenNames).map(token => `bg-${token}`);
  });

  return loadColors;
}

// Note: Use the following to re-generate LOADED_COLORS when needed
// const LOAD_COLORS = generateLoadColors();
// console.log('Generated LOAD_COLORS:', LOAD_COLORS);

// NOTE: Although unused this needs to be here so tailwind will include all the colors i.e. tailwind doesn't generate dynamic classes
const LOADED_COLORS = {
  background: [
    'bg-background-white-pale',
    'bg-background-pale-faint',
    'bg-background-faint-pale',
    'bg-background-white-faint',
    'bg-background-white-black',
    'bg-background-pale-black',
    'bg-background-primary',
    'bg-background-hero',
  ],
  surface: [
    'bg-surface-muted-vivid',
    'bg-surface-muted',
    'bg-surface-muted-strong',
    'bg-surface-muted-mild',
    'bg-surface-muted-soft',
    'bg-surface-muted-pale',
    'bg-surface-muted-faint',
    'bg-surface-primary',
    'bg-surface-primary-faint',
    'bg-surface-hero',
    'bg-surface-hero-faint',
    'bg-surface-pop',
    'bg-surface-pop-faint',
    'bg-surface-holler',
    'bg-surface-holler-faint',
    'bg-surface-sing',
    'bg-surface-sing-faint',
    'bg-surface-dance',
    'bg-surface-dance-faint',
    'bg-surface-success',
    'bg-surface-success-faint',
    'bg-surface-info',
    'bg-surface-info-faint',
    'bg-surface-warning',
    'bg-surface-warning-faint',
    'bg-surface-danger',
    'bg-surface-danger-faint',
    'bg-surface-system-error',
    'bg-surface-system-error-dark',
    'bg-surface-mono',
    'bg-surface-reversed',
  ],
  text: [
    'bg-text-body',
    'bg-text-heading',
    'bg-text-muted',
    'bg-text-primary',
    'bg-text-hero',
    'bg-text-holler',
    'bg-text-link',
    'bg-text-success',
    'bg-text-info',
    'bg-text-warning',
    'bg-text-danger',
    'bg-text-system-error',
    'bg-text-mono',
    'bg-text-reversed',
  ],
  border: [
    'bg-border-muted',
    'bg-border-muted-strong',
    'bg-border-muted-mild',
    'bg-border-muted-soft',
    'bg-border-hero',
    'bg-border-primary',
    'bg-border-pop',
    'bg-border-holler',
    'bg-border-sing',
    'bg-border-dance',
    'bg-border-success',
    'bg-border-success-mild',
    'bg-border-info',
    'bg-border-info-mild',
    'bg-border-warning',
    'bg-border-warning-mild',
    'bg-border-danger',
    'bg-border-danger-mild',
    'bg-border-mono',
    'bg-border-focus',
  ],
  data: [
    'bg-data-a-solid',
    'bg-data-a-tint',
    'bg-data-a-opacity',
    'bg-data-b-solid',
    'bg-data-b-tint',
    'bg-data-b-opacity',
    'bg-data-c-solid',
    'bg-data-c-tint',
    'bg-data-c-opacity',
    'bg-data-d-solid',
    'bg-data-d-tint',
    'bg-data-d-opacity',
    'bg-data-e-solid',
    'bg-data-e-tint',
    'bg-data-e-opacity',
    'bg-data-f-solid',
    'bg-data-f-tint',
    'bg-data-f-opacity',
  ],
  pictogram: ['bg-surface-pictogram-base', 'bg-surface-pictogram-accent'],
  state: [
    'bg-surface-hover-primary',
    'bg-surface-active-primary',
    'bg-surface-hover-hero',
    'bg-surface-active-hero',
    'bg-surface-hover-primary-faint',
    'bg-surface-active-primary-faint',
    'bg-surface-hover-hero-faint',
    'bg-surface-active-hero-faint',
    'bg-surface-hover-muted-pale',
    'bg-surface-active-muted-pale',
    'bg-surface-hover-mono',
    'bg-surface-active-mono',
  ],
};

export const Background: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const backgroundColors = Object.keys(ALL_BRANDS.Tokens[brandName]['light-mode'].color.background);
    return (
      <div className="flex flex-wrap bg-background-white-black">
        {backgroundColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class: bg-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Surface: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const surfaceColors = Object.keys(
      ALL_BRANDS.Tokens[brandName]['light-mode'].color.surface as Record<string, unknown>,
    );

    return (
      <div className="flex flex-wrap bg-background-white-black">
        {surfaceColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class: bg-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Text: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const textColors = Object.keys(ALL_BRANDS.Tokens[brandName]['light-mode'].color.text);
    return (
      <div className="flex flex-wrap bg-background-white-black">
        {textColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class: text-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Border: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const borderColors = Object.keys(ALL_BRANDS.Tokens[brandName]['light-mode'].color.border);
    return (
      <div className="flex flex-wrap bg-background-white-black">
        {borderColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class: border-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Data: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const dataColors = Object.keys(ALL_BRANDS.Tokens[brandName]['light-mode'].color.data);
    return (
      <div className="flex flex-wrap bg-background-white-black">
        {dataColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class: bg-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Pictogram: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const pictogramColors = Object.keys(ALL_BRANDS.Tokens[brandName]['light-mode'].color.pictogram);
    return (
      <div className="flex flex-wrap bg-background-white-black">
        {pictogramColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class: bg-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const State: Story = {
  render: (_, { globals: { theme } }) => {
    const currThemeToken = (theme ? theme : 'WBC') as keyof typeof brandMap;
    const brandName = brandMap[currThemeToken] as keyof typeof ALL_BRANDS.Tokens;
    const stateColors = Object.keys(ALL_BRANDS.Tokens[brandName]['light-mode'].color.state);
    return (
      <div className="flex flex-wrap bg-background-white-black">
        {stateColors.map(color => (
          <div className="w-[33%] max-w-[300px] min-w-[200px] p-2" key={color}>
            <div className={`bg-${color} h-[80px] border border-b-0 border-border-muted-soft`} />
            <div className="divide-y divide-border-muted-soft border border-border-muted-soft p-2">
              <div className="pb-2 font-bold text-text-body">{color}</div>
              <div className="py-2 typography-body-10 font-light text-text-body">{`Tailwind class (should be used with utility classes): bg-${color}`}</div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
