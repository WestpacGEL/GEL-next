## FlexiCell

**Import:** `import { FlexiCell, FlexiCellAdornment, FlexiCellBody, FlexiCellButton, FlexiCellCircle, FlexiCellFooter, FlexiCellHint, FlexiCellLabel } from '@westpac/ui/flexi-cell';`

Flexible content cell for lists and cards.

| Prop         | Type                                 | Default   | Description           |
| ------------ | ------------------------------------ | --------- | --------------------- |
| `before`     | `ReactNode`                          | —         | Left element          |
| `after`      | `ReactNode`                          | —         | Right element         |
| `body`       | `boolean`                            | —         | Wrap in FlexiCellBody |
| `size`       | `ResponsiveVariants<...>`            | `default` | Padding/spacing       |
| `tag`        | `keyof JSX.IntrinsicElements`        | `div`     | HTML element          |
| `href`       | `string`                             | —         | Link href             |
| `withArrow`  | `boolean`                            | —         | Arrow indicator       |
| `withBorder` | `ResponsiveVariants<boolean>`        | `false`   | Border and radius     |
| `topBadge`   | `(props: BadgeProps) => JSX.Element` | —         | Top-right badge       |
| `dualAction` | `boolean`                            | `false`   | Dual action mode      |
| `disabled`   | `boolean`                            | —         | Disabled state        |

**Incorrect (uses `href` without setting `tag="a"`)**

```tsx
<FlexiCell href="/accounts" withArrow>
  <FlexiCellLabel>Accounts</FlexiCellLabel>
</FlexiCell>
```

**Correct**

```tsx
<FlexiCell tag="a" href="/accounts" withArrow>
  <FlexiCellLabel tag="h3">Accounts</FlexiCellLabel>
  <FlexiCellHint>View your account balances</FlexiCellHint>
</FlexiCell>
```

**Capabilities:** Rich compound component · Polymorphic tag · Link or button mode · Dual action · Responsive size/border · Before/after adornments · Top badge
