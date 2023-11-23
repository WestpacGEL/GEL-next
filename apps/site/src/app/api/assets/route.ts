import { NextResponse } from 'next/server';

import { streamFile } from './_utils';

export async function POST(request: Request) {
  const publicDir = __dirname.split('.next')[0] + 'public/';
  let filePath = `${publicDir}assets`;
  const fomData = await request.formData();
  const type = fomData.get('asset');

  switch (type) {
    case 'icon':
      filePath = filePath + '/GEL_Icons.zip';
      break;
    case 'pictogram':
      filePath = filePath + '/GEL_Pictograms.zip';
      break;
    case 'logo': // TODO: Update with logos/symbols assets once I get them from Justin
    default:
      return NextResponse.json({ error: 'Internal Server Error: asset type not found' }, { status: 500 });
  }
  const data: ReadableStream = streamFile(filePath);

  return new NextResponse(data, {
    status: 200,
    headers: new Headers({
      'content-type': 'application/zip',
    }),
  });
}
