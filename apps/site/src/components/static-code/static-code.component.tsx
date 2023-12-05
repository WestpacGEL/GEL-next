import { Button } from '@westpac/ui';
import copy from 'clipboard-copy';
import { Highlight } from 'prism-react-renderer';

import { StaticCodeProps } from './static-code.types';

export const StaticCode = ({
  code,
  language = '', // By default render as plain text (ie. no language)
}: StaticCodeProps) => {
  return (
    <div className="relative overflow-hidden">
      <Highlight code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={[className, 'p-2'].join(' ')} style={style}>
            <code>
              {tokens.map((line, lineKey) => (
                <div key={lineKey} {...getLineProps({ line, key: lineKey })}>
                  {line.map((token, tokenKey) => (
                    <span key={tokenKey} {...getTokenProps({ token, key: tokenKey })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      <button
        className="typography-body-10 absolute right-0 top-0 p-1 pr-2 text-white opacity-50 transition-opacity hover:opacity-100"
        onClick={() => copy(code)}
      >
        Copy code
      </button>
    </div>
  );
};
