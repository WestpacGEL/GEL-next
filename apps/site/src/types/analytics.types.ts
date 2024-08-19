export type AnalyticsConfig = {
  encryptedID: string; // EAM tracker ID. EAM tracker ID available in SAML headers and should be available in JWT
  journeyType: 'auth' | 'pub';
  loginStatus: 'logged in' | 'logged out';
  pageStatus: 'auth' | 'pub';
  scriptSrc: string;
  siteBrand: 'wbc' | 'stg' | 'bom' | 'bsa';
  siteDomain: string;
  siteEnv: 'test' | 'prod';
  siteName: string;
  siteVersion: string;
  trackOnce: boolean;
};

export type OSType = 'macOS' | 'windows' | 'ios' | 'android' | 'linux' | 'unix' | 'bot' | 'unknown';

export type DeviceType = 'desktop' | 'mob' | 'tab' | 'unknown';

export type AnalyticsPayload = {
  accountType?: 'joint' | 'multiple' | 'single';
  appReference?: { Id: string; prod: string }[];
  deviceOperatingSystem?: OSType;
  eventKey?: string;
  formName?: string;
  formVariant?: string;
  newFormName?: string;
  pageAction?: string;
  pageKey?: string;
  pageName?: string;
  pageProperty?: string;
  pageStep?: string;
  pageType?: string;
  pageURL?: string;
  productID?: { product: string; productName: string }[];
  setupOptions?: string;
  siteExperience?: DeviceType;
  siteSection?: string;
  siteSubSection?: string;
  siteSubSubSection?: string;
  transactionDetails?: string;
  transactionType?: string;
};

export type AnalyticsRequest = AnalyticsConfig & AnalyticsPayload;

export type EventType =
  | 'exit'
  | 'link'
  | 'button'
  | 'download'
  | 'call'
  | 'livechat'
  | 'chat'
  | 'targetImpression'
  | 'targetActionDismiss'
  | 'targetActionExpand'
  | 'targetAction'
  | 'targetClicked'
  | 'impression'
  | 'media'
  | 'page';
