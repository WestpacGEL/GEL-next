'use client';

import { Alert } from '@westpac/ui';

import { DemoText } from './components/demo-text.component';

export function AlertTextDemo() {
  return (
    <div className="bg-white p-5 sm:mt-2 sm:p-6">
      <DemoText>Success</DemoText>
      <Alert look="success" mode="text">
        Your account has successfully been opened.
      </Alert>
      <DemoText>Information</DemoText>
      <Alert look="info" mode="text">
        The opening hours for this branch have changed.
      </Alert>
      <DemoText>Warning</DemoText>
      <Alert look="warning" mode="text">
        Please make sure you complete this process, this operation will time out in 5 min.
      </Alert>
      <DemoText>Danger</DemoText>
      <Alert look="danger" mode="text">
        Please enter a valid account number.
      </Alert>
    </div>
  );
}
