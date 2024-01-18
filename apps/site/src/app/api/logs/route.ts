import crypto from 'crypto';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.json({});
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  response.headers.set('x-vercel-verify', process.env.LOG_DRAIN_VERIFY || '');

  return response;
  //   if (process.env.NODE_ENV === 'production') {
  //     if (typeof process.env.VERCEL_LOG_DRAIN_SECRET != 'string') {
  //       throw new Error('No integration secret found');
  //     }

  //     if (!verifySignature(request)) {
  //       return NextResponse.json({
  //         code: 'invalid_signature',
  //         error: "signature didn't match",
  //       });
  //     }

  //     try {
  //       const logs = await request.json();

  //       for (const log of logs) {
  //         const {
  //           id,
  //           timestamp,
  //           proxy: { clientIp, referer },
  //         } = log;

  //         await sql`INSERT INTO logs_drain(log_id, time, request_ip, request_url) VALUES (${id}, TO_TIMESTAMP(${timestamp}::bigint/1000), ${clientIp}, ${referer})`;
  //       }
  //     } catch (error) {
  //       return NextResponse.json({ error }, { status: 500 });
  //     }
  //   }

  //   return NextResponse.json({ message: 'Logged successfully' });
}

async function verifySignature(request: Request) {
  const signature = crypto
    .createHmac('sha1', process.env.VERCEL_LOG_DRAIN_SECRET || '')
    .update(JSON.stringify(request.body))
    .digest('hex');
  return signature === request.headers.get('x-vercel-signature');
}
