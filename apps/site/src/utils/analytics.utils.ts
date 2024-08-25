import {
  AnalyticsConfig,
  AnalyticsPayload,
  AnalyticsRequest,
  DeviceType,
  EventType,
  OSType,
} from '../types/analytics.types';

declare global {
  interface Window {
    wa?: (method: EventType, request: AnalyticsRequest) => void;
  }
}

const OS_MAP: { os: OSType; regex: string }[] = [
  // Possible values that will be matched by string 'Windows':
  { os: 'windows', regex: '(Windows|Win95|Win98|WinNT|Win16|Win 9x 4.90)' },

  // Strings that will match iOS systems:
  { os: 'ios', regex: '(iPhone|iPad|iPod)' },
  // ios strings have to be listed before mac strings - ios user agent contains 'like Mac OS X' string

  // Strings that will match Mac systems:
  { os: 'macOS', regex: '(Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh)' },

  // Strings that will match Android systems:
  { os: 'android', regex: 'Android' },
  // Android strings have to be checked before linux strings - android user agent contains 'Linux' string

  // Strings that will match Linux systems:
  { os: 'linux', regex: '(Linux|X11)' },

  // Strings that will match Unix and unix based systems (including BSD):
  { os: 'unix', regex: '(OpenBSD|SunOS|QNX|UNIX|BeOS|OS/2|Unix)' },

  // Strings that will match most common bots and spiders:
  { os: 'bot', regex: '(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot)' },
];

const getDeviceOS = (): OSType => {
  const userAgent = window.navigator?.userAgent || 'unknown';
  const recognisedOs = OS_MAP.find(os => RegExp(os.regex).test(userAgent)) as { os: OSType; regex: string };
  return recognisedOs?.os || 'unknown';
};

export const getSiteExperience = (): DeviceType => {
  // Numbers used to determine experience are css breakpoints from Bootstrap
  const width = window?.screen?.width || 'unknown';
  const MOBILE_BREAKPOINT = 768; // px
  const TABLET_BREAKPOINT = 992; // px

  if (width === 'unknown') {
    return 'unknown';
  }

  let experience: DeviceType;

  if (width < MOBILE_BREAKPOINT) {
    experience = 'mob';
  } else if (width < TABLET_BREAKPOINT) {
    experience = 'tab';
  } else {
    experience = 'desktop';
  }

  return experience;
};

export const convertToKebabCase = (str: string): string => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

export const createRequest = (
  analyticsConfig: AnalyticsConfig,
  analyticsPayload?: AnalyticsPayload,
): AnalyticsRequest => {
  const pathname = convertToKebabCase(window?.location?.pathname);
  const href = window?.location?.href;
  const defaultPayload = {
    pageKey: convertToKebabCase(href),
    pageName: getPageName(),
    pageURL: href,
    siteSection: getSiteSection(pathname, 0),
    siteSubSection: getSiteSection(pathname, 1),
    siteSubSubSection: getSiteSection(pathname, 2),
    siteExperience: getSiteExperience(),
    deviceOperatingSystem: getDeviceOS(),
  };
  const payload = { ...defaultPayload, ...analyticsConfig, ...analyticsPayload };
  const eventKey = getEventKey(payload);
  return { ...payload, ...{ eventKey } };
};

export const track = (event: EventType, request: AnalyticsRequest): void => {
  if (window?.wa) {
    try {
      window.wa?.(event, request);
    } catch (e) {
      // Do nothing here.
    }
  }
};

const getEventKey = (request: AnalyticsRequest): string => {
  const { siteBrand, siteExperience, pageType, newFormName, pageName, eventKey } = request;
  if (!('eventKey' in request)) {
    // generate an event key if request doesn't contain a one
    return `${siteBrand}:${siteExperience}_${pageType}_${newFormName}_${pageName}`.replace(/_undefined/g, '');
  }
  return eventKey as string;
};

const getSiteSection = (url: string, level: number): string | undefined => {
  const urlArr = url.split('/').slice(1);
  return urlArr[level];
};

const getPageName = (): string => {
  // default page name creates using path & query and when it's empty fallback to page title. E.g. format wbc:www:corp:westpac-iq:ceo-survey
  const query = window?.location?.search;
  const path = window?.location?.pathname;
  const name = `${path + query}`.replace(/^\/|\/$/g, '').replace(/\?|=|&|\//g, ':') || window?.document?.title;
  return convertToKebabCase(name);
};
