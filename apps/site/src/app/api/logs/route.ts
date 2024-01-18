import crypto from 'crypto';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const { VERCEL_LOGS_SECRET } = process.env;
    if (typeof VERCEL_LOGS_SECRET != 'string') {
      return NextResponse.json({ error: 'No log drain secret found' }, { status: 500 });
    }

    const rawBody = await request.text();
    const rawBodyBuffer = Buffer.from(rawBody, 'utf-8');
    const bodySignature = await sha1(rawBodyBuffer, VERCEL_LOGS_SECRET);

    if (bodySignature !== request.headers.get('x-vercel-signature')) {
      return NextResponse.json(
        {
          code: 'invalid_signature',
          error: "signature didn't match",
        },
        { status: 401 },
      );
    }

    try {
      const logs = JSON.parse(rawBody);

      for (const log of logs) {
        const {
          id,
          timestamp,
          proxy: { clientIp, referer },
        } = log;

        await sql`INSERT INTO logs(log_id, time, request_ip, request_url) VALUES (${id}, TO_TIMESTAMP(${timestamp}::bigint/1000), ${clientIp}, ${referer})`;
      }
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Logged successfully' });
}

async function sha1(data: Buffer, secret: string) {
  return crypto.createHmac('sha1', secret).update(data).digest('hex');
}
