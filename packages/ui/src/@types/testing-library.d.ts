declare module '@testing-library/user-event' {
  import userEvent, { directApi } from '@testing-library/user-event';

  declare function setup(): typeof userEvent;

  export const event: {
    readonly clear: typeof directApi.clear;
    readonly click: typeof directApi.click;
    readonly copy: typeof directApi.copy;
    readonly cut: typeof directApi.cut;
    readonly dblClick: typeof directApi.dblClick;
    readonly deselectOptions: typeof directApi.deselectOptions;
    readonly hover: typeof directApi.hover;
    readonly keyboard: typeof directApi.keyboard;
    readonly paste: typeof directApi.paste;
    readonly pointer: typeof directApi.pointer;
    readonly selectOptions: typeof directApi.selectOptions;
    readonly setup: typeof setup;
    readonly tab: typeof directApi.tab;
    readonly tripleClick: typeof directApi.tripleClick;
    readonly type: typeof directApi.type;
    readonly unhover: typeof directApi.unhover;
    readonly upload: typeof directApi.upload;
  };

  export default event;
}
