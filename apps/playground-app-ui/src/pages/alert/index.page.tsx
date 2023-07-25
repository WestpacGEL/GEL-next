import { Alert, Button, TelephoneIcon } from '@westpac/ui';
import Head from 'next/head';
import React, { useState } from 'react';

function ButtonPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Head>
        <title>GEL | Alert</title>
      </Head>
      <div>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Looks</h2>
          <Alert look="info">
            <strong>Heads up!</strong> This alert needs your attention, but it’s not super important.{' '}
            <a href="#">Link</a>
          </Alert>
          <Alert look="success">
            <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
          </Alert>
          <Alert look="warning">
            <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
          </Alert>
          <Alert look="danger">
            <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
          </Alert>
          <Alert look="system">
            <strong>System Error 8942:</strong> The server is no responding. Please try again later. Sorry for the
            inconvenience. <a href="#">Link</a>
          </Alert>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Text mode</h2>
          <Alert look="info" mode="text">
            <strong>Heads up!</strong> This alert needs your attention, but it’s not super important.{' '}
            <a href="#">Link</a>
          </Alert>
          <Alert look="success" mode="text">
            <strong>Well done!</strong> You successfully read this important alert message. <a href="#">Link</a>
          </Alert>
          <Alert look="warning" mode="text">
            <strong>Warning!</strong> Better check yourself, you’re not looking too good. <a href="#">Link</a>
          </Alert>
          <Alert look="danger" mode="text">
            <strong>Oh snap!</strong> Change a few things up and try submitting again. <a href="#">Link</a>
          </Alert>
          <Alert look="system" mode="text">
            <strong>System Error 8942:</strong> The server is no responding. Please try again later. Sorry for the
            inconvenience. <a href="#">Link</a>
          </Alert>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Heading</h2>
          <Alert look="info" heading="I am an alert heading">
            This alert needs your attention, but it’s not super important. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quo dolor provident quasi nisi officia tempore fuga autem, animi iste molestiae, qui omnis
            doloribus aliquid ipsam rem fugiat veniam voluptatem accusamus! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
            <a href="#">Link</a>
          </Alert>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Custom Icon</h2>
          <Alert look="info" icon={TelephoneIcon}>
            <strong>Heads up!</strong> Only info look alerts allow custom icons. <a href="#">Link</a>
          </Alert>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Dismissible</h2>
          <Alert look="info" dismissible>
            <strong>Heads up!</strong> This alert needs your attention, but it’s not super important.{' '}
            <a href="#">Link</a>
          </Alert>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Controlled via open and onClose props</h2>
          <Button className="mb-3" onClick={() => setOpen(open => !open)}>
            {open ? 'Hide' : 'Show'}
          </Button>
          <Alert look="info" dismissible open={open} onClose={() => setOpen(false)}>
            <strong>Heads up!</strong> This alert needs your attention, but it’s not super important.{' '}
            <a href="#">Link</a>
          </Alert>
        </section>
      </div>
    </>
  );
}

export default ButtonPage;
