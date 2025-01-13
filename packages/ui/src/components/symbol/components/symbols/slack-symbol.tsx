import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const SlackSymbol = ({
  'aria-label': ariaLabel = 'Slack',
  copyrightYear = '',
  viewBoxWidth = 32,
  viewBoxHeight = 32,
  className,
  ...props
}: SymbolProps) => (
  <Symbol
    className={clsx('size-[32px]', className)}
    aria-label={ariaLabel}
    copyrightYear={copyrightYear}
    viewBoxWidth={viewBoxWidth}
    viewBoxHeight={viewBoxHeight}
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <rect width="32" height="32" fill="#611F69" rx="2" />
      <path
        fill="#E01E5A"
        d="M10.5762712,19.2372881 C10.5762712,18.0338983 11.559322,17.0508475 12.7627119,17.0508475 C13.9661017,17.0508475 14.9491525,18.0338983 14.9491525,19.2372881 L14.9491525,24.7118644 C14.9491525,25.9152542 13.9661017,26.8983051 12.7627119,26.8983051 C11.559322,26.8983051 10.5762712,25.9152542 10.5762712,24.7118644 L10.5762712,19.2372881 Z M9.47457627,19.2372881 C9.47457627,20.440678 8.49152542,21.4237288 7.28813559,21.4237288 C6.08474576,21.4237288 5.10169492,20.440678 5.10169492,19.2372881 C5.10169492,18.0338983 6.08474576,17.0508475 7.28813559,17.0508475 L9.47457627,17.0508475 L9.47457627,19.2372881 Z"
      />
      <path
        fill="#36C5F0"
        d="M12.7627119,10.5762712 C13.9661017,10.5762712 14.9491525,11.559322 14.9491525,12.7627119 C14.9491525,13.9661017 13.9661017,14.9491525 12.7627119,14.9491525 L7.28813559,14.9491525 C6.08474576,14.9491525 5.10169492,13.9661017 5.10169492,12.7627119 C5.10169492,11.559322 6.08474576,10.5762712 7.28813559,10.5762712 L12.7627119,10.5762712 Z M12.7627119,9.47457627 C11.559322,9.47457627 10.5762712,8.49152542 10.5762712,7.28813559 C10.5762712,6.08474576 11.559322,5.10169492 12.7627119,5.10169492 C13.9661017,5.10169492 14.9491525,6.08474576 14.9491525,7.28813559 L14.9491525,9.47457627 L12.7627119,9.47457627 Z"
      />
      <path
        fill="#2EB67D"
        d="M22.5254237,12.7627119 C22.5254237,11.559322 23.5084746,10.5762712 24.7118644,10.5762712 C25.9152542,10.5762712 26.8983051,11.559322 26.8983051,12.7627119 C26.8983051,13.9661017 25.9152542,14.9491525 24.7118644,14.9491525 L22.5254237,14.9491525 L22.5254237,12.7627119 Z M21.4237288,12.7627119 C21.4237288,13.9661017 20.440678,14.9491525 19.2372881,14.9491525 C18.0338983,14.9491525 17.0508475,13.9661017 17.0508475,12.7627119 L17.0508475,7.28813559 C17.0508475,6.08474576 18.0338983,5.10169492 19.2372881,5.10169492 C20.440678,5.10169492 21.4237288,6.08474576 21.4237288,7.28813559 L21.4237288,12.7627119 Z"
      />
      <path
        fill="#ECB22E"
        d="M19.2372881,21.4237288 C18.0338983,21.4237288 17.0508475,20.440678 17.0508475,19.2372881 C17.0508475,18.0338983 18.0338983,17.0508475 19.2372881,17.0508475 L24.7118644,17.0508475 C25.9152542,17.0508475 26.8983051,18.0338983 26.8983051,19.2372881 C26.8983051,20.440678 25.9152542,21.4237288 24.7118644,21.4237288 L19.2372881,21.4237288 Z M19.2372881,22.5254237 C20.440678,22.5254237 21.4237288,23.5084746 21.4237288,24.7118644 C21.4237288,25.9152542 20.440678,26.8983051 19.2372881,26.8983051 C18.0338983,26.8983051 17.0508475,25.9152542 17.0508475,24.7118644 L17.0508475,22.5254237 L19.2372881,22.5254237 Z"
      />
    </g>
  </Symbol>
);
