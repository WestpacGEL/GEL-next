import React, { Fragment } from 'react';

import { Icon } from '../icon.component.js';
import { type IconProps } from '../icon.types.js';

export function ChildCareIcon({
  look = 'filled',
  'aria-label': ariaLabel = 'Child Care',
  copyrightYear = '2024',
  ...props
}: IconProps) {
  return (
    <Icon aria-label={ariaLabel} copyrightYear={copyrightYear} {...props}>
      {look === 'filled' ? (
        <Fragment>
          <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="currentColor" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 9c3.338 0 10 1.519 10 4.533v5.934c0 1.321-1.28 2.355-3 3.1-.32.139-.655.267-1 .386v-3.286C18 17.893 14.002 17 12 17s-6 .893-6 2.667v.061c.225.104.483.21.773.316 1.547.562 3.416.88 4.747.944V21a1.5 1.5 0 1 1-.285 2.977c-1.537-.09-3.508-.431-5.235-1.024-2.199-.756-4-1.919-4-3.486v-5.934C2 10.52 8.662 9 12 9Zm2.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            fill="currentColor"
          />
        </Fragment>
      ) : (
        <Fragment>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            fill="currentColor"
          />
          <path d="M12 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" fill="currentColor" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 24a1 1 0 1 0 0-2c-1.054 0-2.548-.182-4-.543v-.466c.175-.122.476-.28.92-.439C9.947 20.187 11.22 20 12 20c.78 0 2.053.187 3.08.552.444.159.745.317.92.44v2.52a18.837 18.837 0 0 0 2-.56c2.199-.755 4-1.918 4-3.485v-5.934C22 10.52 15.338 9 12 9S2 10.519 2 13.533v5.934c0 1.567 1.801 2.73 4 3.486l.144.048c.6.2 1.229.37 1.856.51 1.456.326 2.906.489 4 .489Zm5.569-11.984C15.712 11.341 13.443 11 12 11c-1.443 0-3.712.341-5.569 1.016-.93.338-1.627.713-2.054 1.071a1.52 1.52 0 0 0-.348.379.283.283 0 0 0-.028.06L4 13.533v5.934l.001.007a.283.283 0 0 0 .028.06c.043.075.142.207.348.379.358.3.906.613 1.623.905v-.151C6 18.893 9.998 18 12 18s6 .893 6 2.667v.151l.067-.028c.684-.284 1.21-.587 1.556-.877a1.52 1.52 0 0 0 .348-.379.279.279 0 0 0 .028-.06v-.005l.001-.002v-5.936l-.001-.005a.279.279 0 0 0-.028-.06 1.52 1.52 0 0 0-.348-.379c-.427-.357-1.123-.733-2.054-1.071Z"
            fill="currentColor"
          />
        </Fragment>
      )}
    </Icon>
  );
}
