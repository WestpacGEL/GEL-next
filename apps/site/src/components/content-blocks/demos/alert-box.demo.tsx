'use client';

import { Alert } from '@westpac/ui';
import { PhoneIcon } from '@westpac/ui/icon';

import { DemoText } from './components/demo-text.component';

export function AlertBoxDemo() {
  return (
    <div className="bg-white p-5 sm:mt-2 sm:p-6">
      <DemoText>Success</DemoText>
      <Alert look="success">
        <strong>Thank you</strong> Your account has successfully been opened.
      </Alert>
      <DemoText>Information</DemoText>
      <Alert look="info" dismissible>
        <strong>Changed Opening Hours</strong> The opening hours for this branch have changed.
      </Alert>
      <DemoText>Warning</DemoText>
      <Alert look="warning" dismissible>
        <strong>Time out</strong> Please make sure you complete this process, this operation will time out in 5 min.
      </Alert>
      <DemoText>Danger</DemoText>
      <Alert look="danger" dismissible>
        <strong>Please fix the 3 errors listed below</strong>
        <ul className="[&_li]:m-1 [&_li]:underline">
          <li>Select a title</li>
          <li>Enter your given name</li>
          <li>Enter your family name</li>
        </ul>
      </Alert>
      <DemoText>System error</DemoText>
      <Alert look="system" dismissible>
        <strong>System Error</strong> The server is not responding. Please try again later. We are sorry for any
        inconvenience.
      </Alert>
      <DemoText>Flexible info style icon</DemoText>
      <Alert look="info" icon={PhoneIcon}>
        Please make sure your mobile number is correct, we will use this to contact you if we have any questions about
        your application.
      </Alert>
    </div>
  );
}
