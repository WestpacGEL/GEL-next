## ProgressRope

**Import:** `import { ProgressRope } from '@westpac/ui/progress-rope';`

Vertical progress indicator with connected steps.

**Incorrect (children instead of the `data` prop)**

```tsx
<ProgressRope current={1}>
  <div>Step 1</div>
  <div>Step 2</div>
</ProgressRope>
```

**Correct**

```tsx
<ProgressRope current={1} data={[{ text: 'Step 1' }, { text: 'Step 2' }, { text: 'Review and submit' }]} />
```
