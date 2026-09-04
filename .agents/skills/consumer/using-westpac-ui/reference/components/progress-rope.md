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

## StatusRope

**Import:** `import { StatusRope } from '@westpac/ui/progress-rope';`

Informational vertical status indicator with additional information beneath each step.

**Incorrect (missing the required `subText` for each step)**

```tsx
<StatusRope current={1} data={[{ text: 'Application received' }, { text: 'Application review' }]} />
```

**Correct**

```tsx
<StatusRope
  current={1}
  data={[
    { text: 'Application received', subText: 'Received on 10 June' },
    {
      type: 'group',
      text: 'Application review',
      steps: [
        { text: 'Identity check', subText: 'Your identity has been confirmed' },
        { text: 'Financial review', subText: 'We are reviewing your information' },
      ],
    },
    { text: 'Decision', subText: 'We will notify you when a decision is available' },
  ]}
/>
```
