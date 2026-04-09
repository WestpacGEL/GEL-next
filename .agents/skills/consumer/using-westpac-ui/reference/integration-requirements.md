# @westpac/ui Integration Requirements

This reference contains defined integration protocols for consuming platforms using the GEL Next design system, ensuring consistent UI, maintainability, and alignment with future system updates

# Integration Requirements
1. Token Usage
    - Consume tokens only via GEL's tailwind theme variables e.g. '@westpac/style-config/themes'
    - Do not override token values in local stylesheets or component props.

2. Component Usage
    - Use GEL components directly from the package (e.g., import { Accordion } from '@westpac/ui').
    - Avoid duplicating or modifying GEL components unless extension points are documented.
    - Wrap custom components with GEL’s layout and spacing primitives to maintain visual consistency.

3. Styling and Theming
    - Apply themes using GEL’s tailwind theme data attribute and avoid custom theming mechanisms.
    - Do not use global CSS overrides targeting GEL component classes.
    - Use GEL’s spacing and typography tokens for all layout and text styling.

4. Versioning and Updates
    - Always use the latest stable GEL package version unless otherwise approved.

5. Accessibility
    - Do not remove or alter ARIA attributes or keyboard behaviours in GEL components.s
    - Custom components must meet WCAG 2.1 AA standards and pass GEL’s accessibility checklist.

6. Documentation and Governance
    - All deviations from GEL must be documented and reviewed by the Design Systems team.
    - Submit integration reviews for major UI changes or new feature development.
    - Developers use Storybook as the source of truth for component behaviour and usage patterns.
    - Non-compliance may result in UI fragmentation, increased tech debt, and reduced scalability. Regular audits will be conducted to ensure adherence.