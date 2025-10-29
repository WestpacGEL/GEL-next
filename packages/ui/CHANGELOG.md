# @westpac/ui

## 1.0.0-canary.1

### Minor Changes

- 2a687f9: button dropdown with portal and focus
- 95deb81: Datepicker using react-aria API
- 6a44948: Refactored Compacta to use react-aria for improved accessibility and separated responsibilities into Compacta (container) and CompactaItem (individual item) components.
- Button group using useToggleButtonGroup
- focus outline of skip-link fix

## 0.50.3

### Patch Changes

- cb3e3ab: add open option for autocomplete component

## 0.50.2

### Patch Changes

- cfcd3f4: refactored accordion animations so content in accordion no longer gets unmounted

## 0.50.1

### Patch Changes

- b8c8876: Footer component: removing unused nodes inside

## 0.50.0

### Minor Changes

- 380b5cd: introducing DatePickerBeta, datepicker using react-aria hooks

### Patch Changes

- 604f080: fixed issue where accordion content was unmounting on close

## 0.49.0

### Minor Changes

- 53a19b8: Allow button-dropdown to show at the top of the btn when not enough space below

### Patch Changes

- b2214b2: InputGroup with Field passing the props properly
- 8c21c8d: removing the margin-bottom on input-group

## 0.48.0

### Minor Changes

- 0b4cb90: added props to header to control fixed header max width and anchor target for logo link
- 5fe55df: updated alert styling, updated according styling (focus ring, lego), added backdropStyle prop to modal

### Patch Changes

- 33391a7: fix spacing on top when the label is not passed
- b9ffa7c: fixed issue with accordion children and bubbling events

## 0.47.1

### Patch Changes

- 7920a49: colorjs dependency fix

## 0.47.0

### Minor Changes

- 238c381: New isScrolled prop for Header component to be used when fixed for drop shadow control. Minor style update on fixed header to have bottom border transparent when fixed + scrolled to stop header from shifting slightly
- efca078: minor style changes to autocomplete popover
- cbeffcb: removed onClose prop from base modal that wasn't doing anything
- 7904d15: Update dependencies to support React 19

### Patch Changes

- 117af7d: fixed issue where adding custom scroll trigger to fixed header would only trigger the drop shadow style when the custom trigger was scrolled when it should be used as an additional trigger, not a replacement
- b06122c: Update dependencies to fix security alert issues
- 026dde9: refactor depenencies of ui package

## 0.46.0

### Minor Changes

- 96c11c4: removed decorative pictogram, updated folder structure of pictogram component

## 0.45.0

### Minor Changes

- f45b1c3: ESLint configuration upgraded to use ESLint v9 with stricter rules and Bottom sheet now supports an optional zIndex prop for customizable stacking in different scenarios.
- 5cbea89: updated borderDark value for WBG theme
- 605e1c7: storybook and vitest/vite upgrade
- 685cbe8: You can now pass a `brands: BrandKey[]` parameter to generate CSS variables only for the specified brands. This helps reduce output size and improves performance by excluding unused brand tokens.

### Patch Changes

- 39562c4: Fixes the responsive approach on pagination size
- 5bbd25c: Tabpanel body should support to keep the it mounted in dom to keep state preerved. Default is false. If consumer wants to keep it mounted on DOM, can apply keepMounted true at panel level
- c0ba4a9: Updated the ButtonGroup to conditionally omit the label element when not provided, preventing unnecessary spacing and content shifting

## 0.44.0

### Minor Changes

- 2e9f7bd: Update pagination functionality to support larger number of pages and various pagination bug fixes

### Patch Changes

- a27d5ab: centralise the progress indicator inside of a button
- 3f756a8: Click on default pagination(button) click triggers form submission when pagination component used under form tab
- b5f54d8: adjusting the title size in order to place icon on the edges

## 0.43.0

### Minor Changes

- daec52a: addec icons: arrow-thread-reply, fullscreen-exit, replay, volume-off, volume-on, closed-caption; updated icons pause and play
- dd677c0: added: PayTo symbols
- 93a3070: added icons: format color, button shape, color filters, tex increase, text bold, text large, and voiceover on
- d43ef3c: add: panel header now takes react node as children

### Patch Changes

- 9a0e1a0: style updates for autocomplete

## 0.42.3

### Patch Changes

- 7d91d01: focus outlined bug fix
- 6da1e45: Autocomplete accepts ref
- 6872395: fixes icon shrink bug on an error message
- 7e81d8e: most browser has got default button type as submit. if we put popover inside form and click on it, triggers form submit handler
- 5feefff: Alert with same focus outline style
- 8024bc6: Selector radio group isDisabled bugfix
- a9aac5e: updated focus behaviour of radio, checkbox and switch components

## 0.42.2

### Patch Changes

- 0f41959: accordina default open items not working because items keys are being transformed with .$ by React map method. Thus, keys does not match with defaultExpandedKeys

## 0.42.1

### Patch Changes

- 1020b3a: When Alert are put in Form and click on close button, It triggers onsubmit action due default type of button is submit for most of the browsers

## 0.42.0

### Minor Changes

- 12478b5: added pin and unpin icons
- 20c9f07: updated copyright year of all icons and logos to latest

## 0.41.1

### Patch Changes

- 11cd67f: unstyled button must not have padding and text should be left aligned

## 0.41.0

### Minor Changes

- 555b720: updated switch to include isSelected prop

## 0.40.3

### Patch Changes

- b31459e: Update button.styles.ts to implement #1014

## 0.40.2

### Patch Changes

- 18c66ea: Fix popover focus issue

## 0.40.1

### Patch Changes

- 6b3ed1b: popover styling changes for rounded corner, thick arrow, arrow possitioning, and header's font medium

## 0.40.0

### Minor Changes

- 04d5a45: fixes #1006

## 0.39.0

### Minor Changes

- faea8ea: fixes #1003

## 0.38.0

### Minor Changes

- 779e98f: fixes #996

## 0.37.0

### Minor Changes

- 66b74a9: fixes #992

## 0.36.1

### Patch Changes

- 3f410a7: type check fix for onClick prop of popover

## 0.36.0

### Minor Changes

- 40d387d: support #976 date format request

## 0.35.0

### Minor Changes

- 2ed1fd5: fixes #983 and invalid state in #976

## 0.34.1

### Patch Changes

- 4179a06: Fix button group keyboard accessibility bug

## 0.34.0

### Minor Changes

- 62dd521: minior date picker fix #977

## 0.33.0

### Minor Changes

- ca6ed6e: fixes date picker space issue

## 0.32.1

### Patch Changes

- 1687a67: Fix for popover component, injecting React inside of Popover.Panel

## 0.32.0

### Minor Changes

- 0a8cb58: Miscellaneous Bugs and Fixes

## 0.31.0

### Minor Changes

- b4b88a1: consumer component's onclick callback prop should be called with native even object to handle scenarios specific to parent comp
- 08512ae: added: x-symbol and logo
- b018d3c: reverted deletion of twitter icon
- 00d0c35: added: child and child-care icons
- 08512ae: remove: twitter symbol and icon

## 0.30.0

### Minor Changes

- Update passcodeview to allow for controlled input

## 0.29.0

### Minor Changes

- 62db13b: Export brand tokens

## 0.28.0

### Minor Changes

- 6f96072: fixed button groups hover glitch; updated footer story shield margin; updated space below alert title; updated search icon size in automcomplete
- 23dad1b: Updated the appearance and svg of progress indicator component; updated visual bugs in header and badge;
- 94d6345: added icons - arrow circle icons

## 0.27.0

### Minor Changes

- 0ee48a0: updated button styling; fix filter scroll button visual bug
- e158bc8: updated progress-indicators to use IconProps

## 0.26.0

### Minor Changes

- 48a09cb: added iconSize prop option for alert component

## 0.25.0

### Minor Changes

- 82c454db: adding back the body parameter to flexi cell
- cc069a42: - Update filter buttons
  - Update typescript and tailwind variants version
- f82970a2: Added target, cancel-card, and circle icons; Added target pictogram; Updated quick balance icon

## 0.24.1

### Patch Changes

- b4d8f21e: Snyk fixes

## 0.24.0

### Minor Changes

- 4522a5c8: Added left and right directions for the drop arrow icon in ui.

## 0.23.0

### Minor Changes

- af5972c: update the grid container component

### Patch Changes

- 2097183: color change on footer component and example
- aeceb95: updated styling on badge so it looks correct

## 0.22.0

### Minor Changes

- e6df0c3: Add Twitter,stars icons and sparkle pictogram

## 0.21.0

### Minor Changes

- b62d5f9: added new prop to popover components that makes trigger button look like inline link

## 0.20.1

### Patch Changes

- 0a7cf7c: fixed a bug with input group not passing responsive input widths to child inputs correctly

## 0.20.0

### Minor Changes

- b8240a3: Updated types on some components to resolve eslint errors/warnings

## 0.19.0

### Minor Changes

- b9ec8e3: bottom sheet fix

## 0.18.0

### Minor Changes

- 243b111: updated components that use Overlay from react-aria to have a default portal that selects where the data-theme attribute is

## 0.17.0

### Minor Changes

- 29c07cc: update look/feel of modal and bottom sheet

## 0.16.0

### Minor Changes

- 31167d7: added data visualisation colours

## 0.15.0

### Minor Changes

- e3e94d1: Added soft style to badges

## 0.14.1

### Patch Changes

- a43ceef: Fix fixed with input groups not rendering correctly

## 0.14.0

### Minor Changes

- ee3543f: Removed JSX dot notation components due to server component compatibility issues. E.g. Accordion.Item exported as AccordionItem

## 0.13.0

### Minor Changes

- 7a54cf7: Add brand font options to withGEL tailwind plugin

## 0.12.0

### Minor Changes

- 3b27f18: fixed date-picker import issue in CRA based apps

## 0.11.0

### Minor Changes

- d9eb910: Add individual component exports

## 0.10.0

### Minor Changes

- 626c503: misc. styling fixes and optimised the build package

## 0.9.0

### Minor Changes

- 61e6f8b: Removed .storybook and scaffold folders from node module
- fe42599: styling fixes based on UX feedback

## 0.8.0

### Minor Changes

- 842f28d: misc style fixes and removed stories from node package

## 0.7.1

### Patch Changes

- d159d41: miscellaneous visual fixes based on ux feedback

## 0.7.0

### Minor Changes

- 6e580a5: miscellaneous styling updates to bring new components to align with current design system

## 0.6.0

### Minor Changes

- 240f606: fixes keyboard focus style in several components

## 0.5.0

### Minor Changes

- 473c0d6: added selector and repeater components

## 0.4.0

### Minor Changes

- 3182ae2: added auto complete, date picker, progress rope, panel, list, mega input, pagination and compacta

## 0.3.0

### Minor Changes

- add more components

## 0.2.1

### Patch Changes

- Update tailwind plugin dependencies

## 0.2.0

### Minor Changes

- c20c3f7: More component migration work

### Patch Changes

- Updated dependencies [c20c3f7]
  - @westpac/eslint-config@0.1.0
