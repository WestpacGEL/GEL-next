import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

import { formatLog, sha1 } from './utils';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    const { VERCEL_LOGS_SECRET } = process.env;
    if (typeof VERCEL_LOGS_SECRET != 'string') {
      return NextResponse.json({ error: 'No log drain secret found' }, { status: 401 });
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
        const formattedLog = JSON.stringify([formatLog(log)]);
        await sql`INSERT INTO logs SELECT * FROM json_populate_recordset(NULL::logs, ${formattedLog})`;
      }
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ message: 'Logged successfully' });
}
