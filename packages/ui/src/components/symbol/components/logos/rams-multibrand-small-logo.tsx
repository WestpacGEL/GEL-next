import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const RAMSMultibrandSmallLogo = ({
  'aria-label': ariaLabel = 'RAMS',
  copyrightYear = '2023',
  viewBoxWidth = 122,
  viewBoxHeight = 44,
  align = 'left',
  offset = [null, 25, 50],
  className,
  ...props
}: SymbolProps) => (
  <Symbol
    className={clsx('h-[44px] w-[122px]', className)}
    aria-label={ariaLabel}
    align={align}
    offset={offset}
    copyrightYear={copyrightYear}
    viewBoxWidth={viewBoxWidth}
    viewBoxHeight={viewBoxHeight}
    {...props}
  >
    <defs>
      <linearGradient x1="49.018%" y1="17.761%" x2="49.018%" y2="104.314%" id="RAMSMultibrandSmallLogo-a">
        <stop stopColor="#00B6F1" offset="0%" />
        <stop stopColor="#00AEEF" offset="14.4%" />
        <stop stopColor="#00A0E0" offset="31.6%" />
        <stop stopColor="#007DBA" offset="64.3%" />
        <stop stopColor="#007DBA" offset="64.4%" />
        <stop stopColor="#005282" offset="100%" />
      </linearGradient>
      <linearGradient x1="29.892%" y1="53.125%" x2="80.033%" y2="47.754%" id="RAMSMultibrandSmallLogo-b">
        <stop stopColor="#0083C2" offset="0%" />
        <stop stopColor="#0081C0" offset="62.9%" />
        <stop stopColor="#007CB9" offset="73.3%" />
        <stop stopColor="#0072AE" offset="80.7%" />
        <stop stopColor="#00659D" offset="86.7%" />
        <stop stopColor="#005387" offset="91.8%" />
        <stop stopColor="#004474" offset="100%" />
      </linearGradient>
      <linearGradient x1="61.201%" y1="-.93%" x2="32.86%" y2="120.58%" id="RAMSMultibrandSmallLogo-c">
        <stop stopColor="#6DCFF6" offset="0%" />
        <stop stopColor="#00AEEF" offset="43.1%" />
        <stop stopColor="#0088C7" offset="78.2%" />
        <stop stopColor="#0072AA" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M0 0h122v44H0z" />
      <path
        d="M9.875 17.73c.831 0 1.593.137 2.265.407.674.27 1.26.647 1.744 1.12.483.474.858 1.03 1.113 1.654.255.622.384 1.3.384 2.014 0 1.091-.236 2.053-.7 2.857-.372.644-.93 1.17-1.664 1.57.24.117.454.258.64.42.343.296.626.652.842 1.055.213.397.37.839.466 1.312.076.376.134.756.17 1.134h-4.428c-.134-.717-.372-1.25-.71-1.587-.367-.366-1-.551-1.885-.551H4.535v2.404H0V18.55a.87.87 0 01.869-.821h9.006zm15.079 0c.373 0 .688.235.814.563l4.866 12.98-14.605-.098 4.903-12.951a.868.868 0 01.781-.494h3.24zm11.445 0c.386 0 .707.251.823.597l3.73 10.936 3.523-10.92a.871.871 0 01.83-.613h4.537c.464 0 .84.363.868.819l-.007 8.976-4.28 1.077V24.95l-1.334 3.84-8.033 1.337-1.784-5.071v5.434l-4.286.26v-12.15c0-.48.394-.871.877-.871h4.536zm-13.1 5.576l-1.876 5.271h3.69L23.3 23.306zm34.898-5.992c.906 0 1.795.116 2.633.32a7.027 7.027 0 012.379 1.05 5.496 5.496 0 011.144 1.076c.051.066.093.123.134.18.032.044.064.088.095.134l.044.067a4.948 4.948 0 01.363.63c.153.412.03.86-.35 1.1-.769.487-1.84.93-2.293 1.083-.453.153-.743.123-1.032-.29-.177-.254-.604-.839-1.054-1.121a1.466 1.466 0 00-.11-.076 2.896 2.896 0 00-.974-.377c-.625-.128-1.393-.183-2.14-.026a2.2 2.2 0 00-.75.303c-.217.14-.4.318-.54.527-.129.193-.194.451-.194.765 0 .285.05.512.15.674.069.11.236.28.646.472.368.173.893.35 1.56.526.543.144 1.219.319 2.026.524l-6.493 2.222a9.408 9.408 0 01-.512-.354 4.693 4.693 0 01-1.291-1.525c-.33-.613-.497-1.359-.497-2.218 0-.96.211-1.81.626-2.524a5.593 5.593 0 011.618-1.77 7.005 7.005 0 012.235-1.039 9.908 9.908 0 012.577-.333zM8.484 21.392h-3.95v4.339h3.95c.808 0 1.414-.172 1.798-.514.374-.33.562-.9.562-1.692 0-.758-.188-1.305-.56-1.629-.385-.334-.99-.504-1.8-.504z"
        fill="url(#RAMSMultibrandSmallLogo-a)"
        fillRule="nonzero"
        transform="translate(.194 2)"
      />
      <path
        d="M58.954 26.553c.53.137 1.142.294 1.837.469.324.064.798.188 1.39.363.613.18 1.23.472 1.833.868a5.664 5.664 0 011.592 1.612c.455.685.686 1.565.686 2.614 0 .85-.167 1.653-.5 2.385a5.216 5.216 0 01-1.491 1.91c-.648.527-1.462.942-2.415 1.233-.945.289-2.05.435-3.283.435-.998 0-1.981-.124-2.922-.37a7.496 7.496 0 01-2.54-1.177 5.895 5.895 0 01-1.77-2.065 5.36 5.36 0 01-.474-1.366v3.708c0 .481-.391.872-.873.872h-2.541a.872.872 0 01-.872-.872V30.11a90.373 90.373 0 004.286-1.01v2.843a.873.873 0 01.731-.396h2.718c.483 0 .797.373.835.871.018.227.1.512.255.805.195.366.447.667.76.892a3.43 3.43 0 001.147.52c.76.195 1.549.227 2.48.091a3.622 3.622 0 001.025-.306c.301-.144.556-.343.757-.592.186-.233.276-.528.276-.903 0-.392-.118-.698-.362-.935-.275-.266-.645-.495-1.1-.675a11.788 11.788 0 00-1.642-.506c-.633-.15-1.28-.317-1.923-.498a17.196 17.196 0 01-1.963-.616 6.969 6.969 0 01-1.769-.973 4.767 4.767 0 01-.214-.175 79.948 79.948 0 006.046-1.994zm-23.492 5.335l-.001 5.284c0 .482-.39.871-.873.871l-.534.003h-5.559a.868.868 0 01-.81-.6l-1.141-3.337h-6.17l-1.182 3.346a.868.868 0 01-.822.59h-6.092a.875.875 0 01-.834-.614 7.81 7.81 0 01-.282-1.688 29.462 29.462 0 00-.22-2.205 5.83 5.83 0 00-.05-.298c1.445-.015 2.927-.035 4.427-.07.013.119.02.232.03.35.016.287.033.619.05 1 .01.23.026.467.045.705l.789-2.08c4.612-.116 9.435-.341 14.262-.757l.68 1.813v-1.872c1.431-.129 2.862-.275 4.287-.44zM.194 33.272l1.051.002h2.526l.958-.001v3.926a.871.871 0 01-.87.847h-2.79a.875.875 0 01-.875-.871zm45.236-2.907l-2.46 7.08a.869.869 0 01-.824.6h-2.219a.87.87 0 01-.813-.564l-2.02-5.793a133.36 133.36 0 004.002-.568l.05.14.047-.154c1.428-.227 2.842-.464 4.237-.74z"
        fill="#78C339"
      />
      <path
        d="M48.37 6.046c-1.817 4.107.786 8.043 5.342 9.24 3.343.877 7.122-.326 8.478-2.857l-.494-.491a.8.8 0 010-1.131l.97-.968.014-.012c-.267-1.652-1.71-2.743-3.19-3.148-2.36-.645-4.523.15-5.58 1.6-.142.191.146.315.146.315s1.022.471 1.177.555c.154.086.3-.068.383-.136.62-.51 1.553-.885 2.589-.576 1.449.433 2.001 1.6 1.417 2.794-.78 1.592-3.043 1.975-4.697 1.559-2.695-.678-3.637-2.994-2.728-5.19 1.06-2.553 5.118-4.005 8.653-2.97 4.025 1.268 5.91 4.629 4.27 8.334-.356.804-.921 1.626-1.678 2.408-.074.077-.15.153-.228.228l-.061.061c-.101.097-.205.193-.312.288l-.01.01a13.126 13.126 0 01-.724.594c.073.026.145.055.216.084.01.003.02.006.028.01a8.558 8.558 0 01.705.324c.052.027.102.055.153.083l.073.039c.055.03.11.062.163.095l.058.033a6.748 6.748 0 012.606 2.802l.017.034c.026.053.052.107.076.162l.01.023c.057.127.11.254.158.383 3.31-2.317 4.672-5.458 4.911-6.11l.002-.004a.169.169 0 00.007-.02c1.588-4.364.466-9.788-5.277-12.93a17.772 17.772 0 00-.981-.494l.011.01c-.478-.21-.975-.389-1.49-.532-1.15-.322-2.538-.46-3.663-.521A16.816 16.816 0 0058.993 0c-5.05 0-9.03 2.347-10.623 6.046"
        fill="url(#RAMSMultibrandSmallLogo-b)"
        fillRule="nonzero"
        transform="translate(.194 2)"
      />
      <path
        d="M63.637 14.55a.301.301 0 01-.424 0l-.969-.967a.299.299 0 010-.422l.97-.967a.302.302 0 01.423 0l.968.966a.298.298 0 010 .423l-.968.967z"
        fill="#0083C2"
        fillRule="nonzero"
      />
      <path
        d="M66.631 10.288c-.23.825-1.616 3.626-3.151 5.033-.407.42-.857.84-1.373 1.232a7.925 7.925 0 011.808.947 6.641 6.641 0 012.078 2.34c.136.258.282.528.377.785 3.315-2.328 4.68-5.46 4.911-6.11 1.712-4.614.363-10.411-6.252-13.456 2.268 2.206 2.567 5.873 1.602 9.229z"
        fill="url(#RAMSMultibrandSmallLogo-c)"
        fillRule="nonzero"
        transform="translate(.194 2)"
      />
    </g>
  </Symbol>
);
