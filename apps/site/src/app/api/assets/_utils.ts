import fs from 'fs';

/**
 * Below functions are used to convert from node file stream to one that is accepted by NextResponse (which is an extension of the Web Response API)
 *
 * Taken from https://github.com/vercel/next.js/discussions/15453#discussioncomment-6226391
 */

// from https://github.com/MattMorgis/async-stream-generator
async function* nodeStreamToIterator(stream: fs.ReadStream) {
  for await (const chunk of stream) {
    yield chunk;
  }
}

/**
 * Taken from Next.js doc
 * https://nextjs.org/docs/app/building-your-application/routing/router-handlers#streaming
 */
function iteratorToStream(iterator: any): ReadableStream {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        // conversion to Uint8Array is important here otherwise the stream is not readable
        // @see https://github.com/vercel/next.js/issues/38736
        controller.enqueue(new Uint8Array(value));
      }
    },
  });
}

export function streamFile(path: string): ReadableStream {
  const downloadStream = fs.createReadStream(path);
  const data: ReadableStream = iteratorToStream(nodeStreamToIterator(downloadStream));
  return data;
}
