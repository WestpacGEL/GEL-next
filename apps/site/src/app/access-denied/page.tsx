import { Link } from '@westpac/ui';

export default function AccessDenied() {
  return (
    <main className="flex h-screen flex-col items-center justify-center" data-brand="wbc">
      <h1 className="typography-body-6 font-bold">The GEL is no longer publicly available.</h1>
      <p className="mt-4 typography-body-7">
        If you are working on a Westpac project and need to access the GEL please reach out at{' '}
        <Link href="mailto:gel@westpac.com.au" type="inline">
          gel@westpac.com.au
        </Link>
        .
      </p>
      <p className="mt-4 typography-body-7">Thank you.</p>
    </main>
  );
}
