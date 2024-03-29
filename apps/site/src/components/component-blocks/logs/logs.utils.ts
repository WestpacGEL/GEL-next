'use server';

import { sql } from '@vercel/postgres';

export async function getLogs() {
  if (process.env.NODE_ENV === 'production') {
    try {
      const result = await sql`SELECT * FROM logs;`;
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
    }
  } else {
    return {};
  }
}
