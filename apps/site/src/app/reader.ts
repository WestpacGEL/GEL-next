import path from 'path';

import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';
import { cookies, draftMode } from 'next/headers';
import { cache } from 'react';

import keystaticConfig from '../../keystatic.config';

// Force Next.js to package all the markdown files in the content folder. Don't delete this line!
path.join(process.cwd(), 'src', 'content');

export const reader = cache(() => {
  let isDraftModeEnabled = false;
  // draftMode throws in e.g. generateStaticParams
  try {
    isDraftModeEnabled = draftMode().isEnabled;
  } catch {
    // noop
  }

  if (isDraftModeEnabled) {
    const branch = cookies().get('ks-branch')?.value;

    if (branch) {
      return createGitHubReader(keystaticConfig, {
        // Replace the below with your repo org and name
        repo: 'WestpacGEL/GEL-next',
        pathPrefix: 'apps/site',
        ref: branch,
        // Assuming an existing GitHub app
        token: cookies().get('keystatic-gh-access-token')?.value,
      });
    }
  }
  // If draft mode is off, use the regular reader
  return createReader(process.cwd(), keystaticConfig);
});
