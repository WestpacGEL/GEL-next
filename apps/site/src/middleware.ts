import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // logging
  if (process.env.NODE_ENV === 'production') {
    try {
      sql`INSERT INTO logs(url, ip) VALUES (${request.url}, ${request.ip || ''})`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // We need unsafe-inline for style-src in order to make nextjs/image to work
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: res.cloudinary.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src 'self' https://vercel.live/;
    frame-ancestors 'self';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - keystatic (cms routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|keystatic|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
