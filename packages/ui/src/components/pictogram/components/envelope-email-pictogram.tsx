'use client';

/* eslint-disable better-tailwindcss/no-unregistered-classes -- Brand variants are registered by consumer theme CSS. */

import { clsx } from 'clsx';
import React from 'react';

import { Pictogram } from '../pictogram.component.js';
import { fill } from '../pictogram.styles.js';
import { type PictogramProps } from '../pictogram.types.js';

export function EnvelopeEmailPictogram({
  mode = 'default',
  viewBoxWidth = 78,
  viewBoxHeight = 78,
  'aria-label': ariaLabel = 'Email envelope',
  copyrightYear = '2025',
  className,
  ...props
}: PictogramProps) {
  const isWbc26Mode = mode === 'default' || mode === 'inverse';
  const standardMode = isWbc26Mode ? 'duo' : mode;

  return (
    <Pictogram
      className={clsx('size-13', className, !isWbc26Mode && 'wbc26:hidden')}
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      aria-label={ariaLabel}
      copyrightYear={copyrightYear}
      {...props}
    >
      <g className={isWbc26Mode ? 'wbc26:hidden' : undefined} fill="none" fillRule="evenodd">
        <path
          className={fill({ mode: standardMode, highlight: true })}
          d="M33.0815,34.7388 C33.0815,35.7418 33.2845,36.4788 33.6915,36.9528 C34.0975,37.4268 34.6015,37.6638 35.2015,37.6638 C35.6505,37.6638 36.0735,37.5528 36.4685,37.3318 C36.7685,37.1748 37.0635,36.9258 37.3555,36.5868 C37.7745,36.1038 38.1355,35.4018 38.4395,34.4778 C38.7435,33.5538 38.8955,32.6938 38.8955,31.8968 C38.8955,31.0048 38.6885,30.3198 38.2735,29.8428 C37.8595,29.3648 37.3365,29.1258 36.7055,29.1258 C36.0255,29.1258 35.3985,29.3878 34.8225,29.9138 C34.2455,30.4378 33.8115,31.1858 33.5195,32.1578 C33.2275,33.1288 33.0815,33.9888 33.0815,34.7388 M45.8815,39.6058 L48.4045,39.6058 C47.6145,41.2088 46.4025,42.4638 44.7695,43.3718 C42.8975,44.4138 40.6165,44.9338 37.9245,44.9338 C35.3195,44.9338 33.0695,44.4938 31.1745,43.6138 C29.2805,42.7338 27.8715,41.4348 26.9475,39.7178 C26.0235,38.0018 25.5615,36.1328 25.5615,34.1108 C25.5615,31.8928 26.0865,29.8268 27.1375,27.9128 C28.1865,25.9978 29.6235,24.5608 31.4475,23.6018 C33.2705,22.6428 35.3545,22.1638 37.6995,22.1638 C39.6885,22.1638 41.4565,22.5508 43.0045,23.3238 C44.5515,24.0968 45.7335,25.1968 46.5515,26.6218 C47.3685,28.0468 47.7765,29.6028 47.7765,31.2928 C47.7765,33.3058 47.1565,35.1258 45.9175,36.7518 C44.3625,38.8038 42.3695,39.8308 39.9375,39.8308 C39.2825,39.8308 38.7895,39.7168 38.4575,39.4868 C38.1255,39.2588 37.9045,38.9228 37.7945,38.4808 C36.8625,39.3808 35.7895,39.8308 34.5735,39.8308 C33.2635,39.8308 32.1755,39.3788 31.3105,38.4748 C30.4465,37.5708 30.0145,36.3688 30.0145,34.8688 C30.0145,33.0138 30.5355,31.3208 31.5775,29.7888 C32.8405,27.9268 34.4585,26.9948 36.4325,26.9948 C37.8375,26.9948 38.8755,27.5318 39.5465,28.6048 L39.8425,27.2908 L42.9695,27.2908 L41.1815,35.7808 C41.0705,36.3178 41.0155,36.6648 41.0155,36.8228 C41.0155,37.0198 41.0605,37.1688 41.1515,37.2668 C41.2425,37.3658 41.3505,37.4148 41.4775,37.4148 C41.8555,37.4148 42.3455,37.1858 42.9455,36.7278 C43.7505,36.1288 44.4015,35.3228 44.8985,34.3118 C45.3965,33.3018 45.6445,32.2568 45.6445,31.1748 C45.6445,29.2328 44.9425,27.6078 43.5375,26.3008 C42.1325,24.9958 40.1705,24.3428 37.6525,24.3428 C35.5125,24.3428 33.6995,24.7778 32.2105,25.6508 C30.7235,26.5228 29.6025,27.7508 28.8485,29.3338 C28.0945,30.9158 27.7175,32.5638 27.7175,34.2768 C27.7175,35.9428 28.1375,37.4588 28.9785,38.8238 C29.8195,40.1898 30.9995,41.1858 32.5195,41.8138 C34.0385,42.4418 35.7775,42.7558 37.7345,42.7558 C39.6225,42.7558 41.2445,42.4928 42.6025,41.9678 C43.9595,41.4428 45.0535,40.6558 45.8815,39.6058"
        />
        <path
          className={fill({ mode: standardMode, outline: true })}
          d="M62.6138,64.3315 C62.6138,64.3555 62.6078,64.3795 62.6068,64.4035 L47.7048,50.9265 C48.1738,50.5125 48.6508,50.0905 49.1668,49.6305 C52.3278,46.8155 54.5078,44.8085 56.0128,43.3555 L62.6138,37.5055 L62.6138,64.3315 Z M60.8008,66.1435 L13.3128,66.1435 C13.2228,66.1435 13.1368,66.1305 13.0508,66.1175 L27.8488,52.7325 C30.9018,55.5585 32.6108,57.0035 33.5868,57.7265 C33.7808,57.8765 33.9768,58.0185 34.1828,58.1375 C34.4408,58.3005 34.6168,58.3845 34.7428,58.4255 C35.3648,58.6905 36.0148,58.8345 36.6688,58.8345 C37.1038,58.8345 37.5348,58.7545 37.9618,58.6365 C38.0278,58.6265 38.1108,58.6035 38.2128,58.5645 C38.8628,58.3475 39.4888,58.0045 40.0518,57.5045 L41.2278,56.4625 C42.3288,55.5775 43.8088,54.3345 45.8148,52.5865 L60.8038,66.1435 C60.8028,66.1435 60.8018,66.1435 60.8008,66.1435 L60.8008,66.1435 Z M11.4998,37.4025 L20.0068,45.2525 C21.1568,46.3875 22.5388,47.7255 24.2328,49.3365 C24.8658,49.9385 25.4558,50.4965 26.0148,51.0215 L11.4998,64.1505 L11.4998,37.4025 Z M12.0418,33.3795 L14.5938,30.8675 L14.5938,36.8555 L11.6028,34.0965 C11.6938,33.8285 11.8378,33.5795 12.0418,33.3795 L12.0418,33.3795 Z M17.0938,17.7425 C17.0938,17.4145 17.3598,17.1475 17.6888,17.1475 L56.2778,17.1475 C56.6068,17.1475 56.8728,17.4145 56.8728,17.7425 L56.8728,38.9015 C55.2708,40.9415 42.7668,52.1515 38.5748,55.3935 C37.9518,55.8755 37.1748,56.1065 36.3878,56.0565 C35.7138,56.0135 35.0738,55.7665 34.5498,55.3395 C30.7298,52.2285 18.5938,40.6235 17.0938,38.5645 L17.0938,17.7425 Z M35.7858,10.0155 C36.1358,9.6705 36.5958,9.4985 37.0568,9.4985 C37.5178,9.4985 37.9778,9.6705 38.3278,10.0155 L43.0368,14.6475 L31.0768,14.6475 L35.7858,10.0155 Z M59.3728,30.7235 L62.0728,33.3805 C62.3078,33.6105 62.4678,33.9055 62.5498,34.2225 L59.3728,37.0375 L59.3728,30.7235 Z M66.6638,34.4235 L63.9848,31.7875 C63.9288,31.7265 63.8858,31.6545 63.8258,31.5965 L59.3728,27.2135 L59.3728,17.7425 C59.3728,16.0365 57.9848,14.6475 56.2778,14.6475 L46.6028,14.6475 L40.0818,8.2315 C38.4138,6.5905 35.6998,6.5885 34.0318,8.2315 L27.5108,14.6475 L17.6888,14.6475 C15.9818,14.6475 14.5938,16.0365 14.5938,17.7425 L14.5938,27.3585 L10.2878,31.5955 C9.4698,32.4005 8.9998,33.5205 8.9998,34.6695 L8.9998,64.3295 C8.9998,65.0945 9.2168,65.8035 9.5678,66.4275 L9.5068,66.3845 C9.5068,66.3845 11.1808,69.6435 14.4598,71.1775 C14.4598,71.1775 14.4428,71.1455 14.4188,71.1015 C14.9488,71.3355 15.5328,71.4705 16.1498,71.4705 L63.6378,71.4705 C66.0168,71.4705 67.9508,69.5355 67.9508,67.1565 L67.9508,37.4965 C67.9508,36.3485 67.4818,35.2275 66.6638,34.4235 L66.6638,34.4235 Z"
        />
      </g>
      {/* TODO: Confirm with GEL team on the correct token color mapping for the WBC 2026 brand. These colours currently dont map to a semantic token color */}
      {isWbc26Mode ? (
        <g className="wbc26:inline hidden">
          <g filter="url(#filter0_ddii_16613_1168)">
            <path
              d="M12 31.863C12 30.8341 12.8341 30 13.863 30H64.137C65.1659 30 66 30.8341 66 31.863V62.137C66 63.1659 65.1659 64 64.137 64H13.863C12.8341 64 12 63.1659 12 62.137V31.863Z"
              fill={mode === 'default' ? '#F1423C' : '#DEDAD5'}
            />
          </g>
          <g filter="url(#filter1_ii_16613_1168)">
            <path
              d="M12.8525 30.3526L37.7464 12.4027C38.4911 11.8658 39.5089 11.8658 40.2536 12.4027L65.1475 30.3526C66.2842 31.1722 66.2842 32.8278 65.1475 33.6474L40.2536 51.5973C39.5089 52.1342 38.4911 52.1342 37.7464 51.5973L12.8525 33.6474C11.7158 32.8278 11.7158 31.1722 12.8525 30.3526Z"
              fill={mode === 'default' ? '#CF2C2C' : '#AAA1A0'}
            />
          </g>
          <g filter="url(#filter2_ii_16613_1168)">
            <path
              d="M56 16C57.1046 16 58 16.8954 58 18V38.8008L40.2539 51.5977C39.5092 52.1346 38.4908 52.1346 37.7461 51.5977L20 38.8008V18C20 16.8954 20.8954 16 22 16H56Z"
              fill="#DEDAD5"
            />
          </g>
          <g filter="url(#filter3_ii_16613_1168)">
            <path
              d="M38.3734 42C33.4909 42 29 38.7929 29 32.7576C29 27.5051 32.8381 22 40.0444 22C46.1279 22 49 26.1667 49 30.0556C49 33.5657 46.7285 37.1263 42.4204 37.1263C40.8538 37.1263 39.7311 36.3939 39.7572 35.3081H39.6789C39.0783 36.495 38.1645 37.0758 37.0157 37.0758C35.5274 37.0758 34.1958 35.7374 34.1958 32.7828C34.1958 29.3485 36.1279 26.798 38.295 26.798C39.4439 26.798 40.2272 27.5303 40.4099 28.5152H40.4882L40.7755 27.0505H44.1697L42.9948 33.1364C42.8381 33.9697 42.6031 34.7525 43.2037 34.7525C44.6136 34.7525 45.6057 32.5556 45.6057 30.4091C45.6057 27.7828 44.0914 24.8283 40.0444 24.8283C35.188 24.8283 32.5248 28.9444 32.5248 32.7576C32.5248 36.3687 35.0836 39.1717 38.7389 39.1717C40.2794 39.1717 42.0287 38.6667 43.8825 37.5051L45.2402 39.7525C43.1253 41.2929 40.671 42 38.3734 42ZM38.5822 34.197C39.5483 34.197 40.1488 32.5808 40.1488 31.2424C40.1488 30.3333 39.8616 29.5758 39.2089 29.5758C38.2428 29.5758 37.6423 31.1919 37.6423 32.5303C37.6423 33.4394 37.9295 34.197 38.5822 34.197Z"
              fill="#F1423C"
            />
          </g>
          <defs>
            <filter
              id="filter0_ddii_16613_1168"
              x="10"
              y="29"
              width="68"
              height="49"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="5" dy="7" />
              <feGaussianBlur stdDeviation="3.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16613_1168" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="2" dy="3" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_16613_1168" result="effect2_dropShadow_16613_1168" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_16613_1168" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.6" dy="0.8" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.999249 0 0 0 0 0.999249 0 0 0 0 0.999249 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_16613_1168" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.6" dy="-0.8" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="effect3_innerShadow_16613_1168" result="effect4_innerShadow_16613_1168" />
            </filter>
            <filter
              id="filter1_ii_16613_1168"
              x="8"
              y="10"
              width="59"
              height="43"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-4" dy="-2" />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_16613_1168" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.32 0" />
              <feBlend mode="normal" in2="effect1_innerShadow_16613_1168" result="effect2_innerShadow_16613_1168" />
            </filter>
            <filter
              id="filter2_ii_16613_1168"
              x="20"
              y="15"
              width="39"
              height="38.0004"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_16613_1168" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0" />
              <feBlend mode="normal" in2="effect1_innerShadow_16613_1168" result="effect2_innerShadow_16613_1168" />
            </filter>
            <filter
              id="filter3_ii_16613_1168"
              x="28.7"
              y="21.6"
              width="21.3"
              height="21.4"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-0.3" dy="-0.4" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_16613_1168" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.32 0" />
              <feBlend mode="normal" in2="effect1_innerShadow_16613_1168" result="effect2_innerShadow_16613_1168" />
            </filter>
          </defs>
        </g>
      ) : null}
    </Pictogram>
  );
}
