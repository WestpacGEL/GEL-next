## Dropdown

**Import:** `import { Dropdown, DropdownHeading } from '@westpac/ui/dropdown';`

Button with dropdown panel.

| Prop              | Type                                                     | Default | Description           |
| ----------------- | -------------------------------------------------------- | ------- | --------------------- |
| `text`            | `ReactNode`                                              | —       | Button text           |
| `look`            | `'primary' \| 'hero' \| 'faint' \| 'unstyled' \| 'link'` | —       | Button look           |
| `soft`            | `ButtonProps['soft']`                                    | —       | Soft button style     |
| `size`            | `ButtonProps['size']`                                    | —       | Button size           |
| `block`           | `ButtonProps['block']`                                   | —       | Full width            |
| `dropdownSize`    | `ResponsiveVariants<...>`                                | —       | Panel size            |
| `open`            | `boolean`                                                | —       | Controlled open state |
| `placement`       | `Placement`                                              | —       | Popover placement     |
| `iconBefore`      | `ButtonProps['iconBefore']`                              | —       | Button icon           |
| `dropDownIcon`    | `(props: IconProps) => ReactNode`                        | —       | Custom dropdown icon  |
| `portalContainer` | `Element`                                                | —       | Portal container      |

**Incorrect (wrong prop name `label` and raw heading element)**

```tsx
<Dropdown label="Options" look="primary">
  <h3>Section</h3>
  <a href="/option1">Option 1</a>
  <a href="/option2">Option 2</a>
</Dropdown>
```

**Correct**

```tsx
<Dropdown text="Options" look="primary">
  <DropdownHeading>Section</DropdownHeading>
  <a href="/option1">Option 1</a>
  <a href="/option2">Option 2</a>
</Dropdown>
```

**Capabilities:** Compound with DropdownHeading · Controlled or uncontrolled · All button styling props · Custom placement · Portal support
