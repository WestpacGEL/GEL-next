import { Link } from '@westpac/ui';

import { Svg } from '@/components/svg';

export default function AccessDenied() {
  return (
    <main className="flex h-screen flex-col items-center p-4 text-center" data-brand="wbc">
      <Svg viewBox="0 0 260 298" width={260} height={298}>
        <path
          fill="#c80038"
          fillRule="evenodd"
          d="M130 297.053v-36.861c-71.796 0-130-58.246-130-130.096S58.204 0 130 0s130 58.247 130 130.096c0 107.547-100.118 151.996-130 166.957"
          clipRule="evenodd"
        />
        <path
          fill="#fff"
          d="M77.822 95.357c16.118 0 30.421 7.35 31.756 25.101H90.221c-.954-6.395-5.056-9.736-12.302-9.736-9.632 0-15.45 7.446-15.45 19.757v.763c0 11.071 4.1 19.66 15.925 19.66 9.537 0 13.16-4.869 13.543-10.308H79.16v-13.647H111.2v8.398c0 17.37-11.348 30.445-33.378 30.445-23.174 0-35.76-14.411-35.76-34.834v-.764c0-20.805 15.257-34.835 35.76-34.835m86.212 16.129h-27.656v11.739h22.028v13.934h-22.028v12.406h29.181v15.078h-48.635V96.409h47.11zm27.083 37.984h25.75v15.173h-45.393V96.409h19.643z"
        />
      </Svg>
      <h1 className="mt-6 typography-body-6 font-bold">The GEL is no longer publicly available.</h1>
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
