import { clsx } from 'clsx';
import React from 'react';

import { Symbol } from '../../symbol.component.js';
import { type SymbolProps } from '../../symbol.types.js';

export const RAMSMultibrandLargeLogo = ({
  'aria-label': ariaLabel = 'RAMS',
  copyrightYear = '2024',
  viewBoxWidth = 180,
  viewBoxHeight = 65,
  align = 'left',
  offset = [null, 40.5, 81],
  className,
  ...props
}: SymbolProps) => (
  <Symbol
    className={clsx('h-[65px] w-[180px]', className)}
    aria-label={ariaLabel}
    align={align}
    offset={offset}
    copyrightYear={copyrightYear}
    viewBoxWidth={viewBoxWidth}
    viewBoxHeight={viewBoxHeight}
    {...props}
  >
    <defs>
      <linearGradient x1="49.289%" y1="16.767%" x2="49.289%" y2="102.357%" id="RAMSMultibrandLargeLogo-a">
        <stop stopColor="#00B6F1" offset="0%" />
        <stop stopColor="#00AEEF" offset="14.4%" />
        <stop stopColor="#00A0E0" offset="31.6%" />
        <stop stopColor="#007DBA" offset="64.3%" />
        <stop stopColor="#007DBA" offset="64.4%" />
        <stop stopColor="#005282" offset="100%" />
      </linearGradient>
      <linearGradient x1="29.892%" y1="53.141%" x2="80.033%" y2="47.743%" id="RAMSMultibrandLargeLogo-b">
        <stop stopColor="#0083C2" offset="0%" />
        <stop stopColor="#0081C0" offset="62.9%" />
        <stop stopColor="#007CB9" offset="73.3%" />
        <stop stopColor="#0072AE" offset="80.7%" />
        <stop stopColor="#00659D" offset="86.7%" />
        <stop stopColor="#005387" offset="91.8%" />
        <stop stopColor="#004474" offset="100%" />
      </linearGradient>
      <linearGradient x1="61.146%" y1="-.93%" x2="32.944%" y2="120.58%" id="RAMSMultibrandLargeLogo-c">
        <stop stopColor="#6DCFF6" offset="0%" />
        <stop stopColor="#00AEEF" offset="43.1%" />
        <stop stopColor="#0088C7" offset="78.2%" />
        <stop stopColor="#0072AA" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M0 0h180v65H0z" />
      <path
        d="M13.578 24.438c1.143 0 2.19.19 3.115.562a7.275 7.275 0 012.397 1.544 6.773 6.773 0 011.531 2.28 7.31 7.31 0 01.527 2.775c0 1.505-.324 2.83-.962 3.938-.512.888-1.278 1.613-2.288 2.164.33.162.624.355.882.578.47.41.859.9 1.157 1.456a6.61 6.61 0 01.64 1.808c.105.518.184 1.042.234 1.563h-6.089c-.184-.988-.511-1.723-.977-2.188-.503-.504-1.375-.76-2.591-.76H6.236v3.314H0V25.57a1.197 1.197 0 011.194-1.132h12.384zm20.733 0a1.2 1.2 0 011.12.776l6.69 17.892-20.082-.135 6.743-17.851a1.194 1.194 0 011.074-.682h4.455zm15.738 0c.53 0 .971.347 1.131.824l5.128 15.074 4.846-15.054a1.198 1.198 0 011.14-.844h6.239a1.2 1.2 0 011.193 1.13l-.01 12.372-5.885 1.484v-5.032l-1.834 5.293-11.046 1.842-2.452-6.989v7.49l-5.894.359V25.64c0-.662.542-1.202 1.206-1.202h6.238zm-18.012 7.686l-2.58 7.266h5.075l-2.495-7.266zm47.983-8.26c1.246 0 2.469.161 3.621.442a9.65 9.65 0 013.27 1.448 7.559 7.559 0 011.574 1.483c.07.09.128.17.185.248.044.06.088.121.13.185.021.03.04.06.06.092a6.822 6.822 0 01.5.868c.21.569.042 1.184-.482 1.517-1.056.67-2.53 1.281-3.153 1.492-.622.21-1.02.17-1.418-.4-.243-.35-.831-1.156-1.45-1.545a2.016 2.016 0 00-.15-.104 3.976 3.976 0 00-1.34-.52c-.859-.177-1.915-.253-2.943-.036-.376.08-.724.22-1.03.418-.3.193-.55.438-.742.727-.179.265-.267.621-.267 1.054 0 .393.069.705.206.929.094.152.323.387.888.65.506.238 1.228.483 2.144.726.747.198 1.676.438 2.786.721l-8.928 3.063c-.32-.21-.554-.373-.704-.488a6.465 6.465 0 01-1.775-2.102c-.454-.844-.683-1.873-.683-3.057 0-1.324.29-2.495.861-3.478a7.702 7.702 0 012.224-2.44 9.622 9.622 0 013.074-1.432 13.591 13.591 0 013.542-.46zm-68.354 5.622h-5.43v5.981h5.43c1.111 0 1.943-.237 2.472-.708.514-.456.772-1.242.772-2.332 0-1.045-.258-1.8-.77-2.246-.529-.46-1.361-.695-2.474-.695z"
        fill="url(#RAMSMultibrandLargeLogo-a)"
        fillRule="nonzero"
        transform="translate(0 5)"
      />
      <path
        d="M80.796 38.844c.728.188 1.57.404 2.525.646.446.089 1.097.258 1.91.5.844.249 1.692.651 2.522 1.196.842.555 1.578 1.302 2.19 2.222.625.945.942 2.157.942 3.604 0 1.171-.23 2.277-.686 3.287a7.188 7.188 0 01-2.052 2.632c-.89.727-2.01 1.3-3.32 1.7-1.3.398-2.818.6-4.515.6-1.371 0-2.723-.172-4.017-.51-1.31-.341-2.484-.888-3.491-1.623a8.12 8.12 0 01-2.434-2.846 7.401 7.401 0 01-.653-1.882v5.11c0 .664-.538 1.202-1.2 1.202h-3.494c-.662 0-1.2-.538-1.2-1.201v-9.735c2-.422 3.967-.886 5.894-1.392v3.919a1.2 1.2 0 011.006-.545h3.737c.664 0 1.095.514 1.147 1.2.025.312.14.705.352 1.11.267.503.614.918 1.044 1.23.443.318.974.557 1.578.714 1.044.27 2.129.314 3.409.127a4.97 4.97 0 001.41-.422 2.96 2.96 0 001.04-.816c.257-.32.38-.728.38-1.245 0-.54-.162-.962-.497-1.289-.378-.367-.887-.681-1.512-.93-.66-.264-1.42-.498-2.259-.697-.87-.206-1.76-.438-2.644-.687a23.603 23.603 0 01-2.699-.85 9.575 9.575 0 01-2.432-1.34 6.558 6.558 0 01-.294-.241 109.74 109.74 0 008.313-2.748zm-32.303 7.353v7.283a1.2 1.2 0 01-1.2 1.201l-.735.004h-7.644a1.194 1.194 0 01-1.114-.828l-1.569-4.599h-8.484l-1.624 4.612a1.194 1.194 0 01-1.13.815h-8.377c-.54 0-.995-.358-1.147-.848-.2-.687-.332-1.465-.387-2.327a40.707 40.707 0 00-.303-3.039 8.055 8.055 0 00-.07-.41 508.07 508.07 0 006.089-.096c.017.163.028.319.04.482.023.395.046.853.069 1.378.014.317.036.643.062.971l1.085-2.865c6.342-.162 12.974-.472 19.611-1.045l.935 2.5v-2.581c1.967-.178 3.934-.38 5.893-.608zM0 48.105l1.52.003h.842l.44.001h.92l2.514-.003v5.412a1.199 1.199 0 01-1.197 1.167H1.203c-.664 0-1.2-.538-1.203-1.201zm62.2-4.007l-3.382 9.76a1.195 1.195 0 01-1.134.825h-3.05c-.514 0-.948-.324-1.119-.777l-2.777-7.985c1.848-.236 3.68-.494 5.503-.783l.07.192.063-.212c1.964-.312 3.907-.638 5.826-1.02z"
        fill="#78C339"
      />
      <path
        d="M66.509 8.334c-2.498 5.661 1.08 11.085 7.345 12.736 4.597 1.21 9.792-.45 11.657-3.938l-.678-.678a1.105 1.105 0 010-1.558l1.333-1.334c.007-.006.013-.01.019-.017-.367-2.277-2.35-3.78-4.385-4.338-3.245-.89-6.22.207-7.675 2.204-.194.264.201.435.201.435s1.407.65 1.619.765c.213.118.414-.095.527-.188.852-.702 2.135-1.22 3.56-.794 1.992.597 2.752 2.207 1.948 3.851-1.072 2.194-4.183 2.723-6.458 2.149-3.706-.934-5.001-4.127-3.75-7.153 1.456-3.52 7.037-5.52 11.896-4.095 5.535 1.749 8.126 6.38 5.872 11.489-.49 1.108-1.267 2.24-2.307 3.318-.101.107-.206.211-.313.315-.03.028-.056.056-.085.084a15.26 15.26 0 01-.429.397l-.014.013a18.06 18.06 0 01-.467.4c-.007.005-.014.01-.02.017-.166.135-.334.269-.508.402.1.037.199.076.297.115l.038.015a11.754 11.754 0 01.97.447c.072.037.14.076.21.113l.101.054c.076.043.15.087.225.132l.079.045c.2.122.397.25.588.383A9.293 9.293 0 0190.9 27.6l.023.047c.036.073.071.146.105.222l.015.033c.077.174.15.35.216.527 4.552-3.194 6.424-7.524 6.753-8.422l.002-.005a.233.233 0 00.01-.029c2.184-6.015.64-13.49-7.255-17.82a24.411 24.411 0 00-1.35-.682l.016.015A15.332 15.332 0 0087.386.75C85.804.308 83.896.117 82.35.033A23.065 23.065 0 0081.116 0C74.17 0 68.7 3.235 66.509 8.334"
        fill="url(#RAMSMultibrandLargeLogo-b)"
        fillRule="nonzero"
        transform="translate(0 5)"
      />
      <path
        d="M87.235 22.298a.413.413 0 01-.583 0l-1.332-1.332a.413.413 0 010-.583l1.332-1.332a.414.414 0 01.583 0l1.331 1.332a.411.411 0 010 .582l-1.33 1.333z"
        fill="#0083C2"
        fillRule="nonzero"
      />
      <path
        d="M91.618 14.18c-.317 1.138-2.222 4.999-4.333 6.939a16.85 16.85 0 01-1.888 1.697c.896.335 1.72.765 2.486 1.306a9.147 9.147 0 012.857 3.226c.187.355.389.726.52 1.08 4.556-3.207 6.434-7.525 6.752-8.42 2.353-6.36.498-14.351-8.598-18.548 3.12 3.04 3.53 8.095 2.204 12.72z"
        fill="url(#RAMSMultibrandLargeLogo-c)"
        fillRule="nonzero"
        transform="translate(0 5)"
      />
    </g>
  </Symbol>
);
