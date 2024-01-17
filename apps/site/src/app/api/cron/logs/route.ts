import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`DELETE FROM logs WHERE time < CURRENT_DATE - interval '1 month';`;
    return NextResponse.json({ message: 'Logs cleared' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
