import copy from 'clipboard-copy';
import { Highlight, themes } from 'prism-react-renderer';

import { StaticCodeProps } from './static-code.types';

export const StaticCode = ({
  code,
  language = '', // By default render as plain text (ie. no language).
}: StaticCodeProps) => {
  return (
    <div className="relative overflow-hidden">
      <Highlight code={code} language={language} theme={themes.oceanicNext}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={[className, 'p-2'].join(' ')} style={style}>
            <code className="font-monospace text-base leading-loose">
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
        className='typography-body-10 absolute right-0 top-0 p-1 pr-2 text-text-mono opacity-50 transition-opacity hover:opacity-100'
        onClick={() => {
          void copy(code);
        }}
      >
        Copy code
      </button>
    </div>
  );
};
