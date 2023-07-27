import { AlertIcon, Button } from '@westpac/ui';
import copy from 'clipboard-copy';
import { clsx } from 'clsx';
import { Highlight, Prism, themes } from 'prism-react-renderer';
import React, { Fragment, KeyboardEvent, ReactNode, useCallback, useContext, useId, useRef, useState } from 'react';
import { LiveContext, LiveEditor, LivePreview, LiveProvider } from 'react-live';

import { BracketIcon } from '../../../icons/bracket-icon';

import * as UISystemComponents from './code.inject-components';

// Add support for diff language support
// https://github.com/FormidableLabs/prism-react-renderer#custom-language-support
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-diff');

function LiveCode({ showCode = false, className }: { className?: string; showCode?: boolean }) {
  const liveCodeToggleButton = useRef<HTMLButtonElement>(null);
  const live = useContext(LiveContext);

  const liveOnChange = live.onChange;
  const [localCopy, setLocalCopy] = useState<string>(live.code);
  const [isCodeVisible, toggleIsCodeVisible] = useState(showCode);

  const copyLiveCode = useCallback(() => {
    copy(localCopy);
  }, [localCopy]);

  const handleChange = useCallback(
    (code: string) => {
      liveOnChange(code);
      setLocalCopy(code);
    },
    [liveOnChange],
  );

  const id = useId();
  const codeId = `live-code-${id}`;

  const onLiveEditorContainerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.code === 'Escape') {
        toggleIsCodeVisible(state => !state);
        liveCodeToggleButton.current?.focus();
      }
    },
    [toggleIsCodeVisible],
  );

  return (
    <div className={clsx('max-w-4xl overflow-hidden rounded-md border border-muted-50 p-4 pb-0', className)}>
      <div className="relative -mx-4 -mt-4 border-muted-50 p-4">
        {live.error ? (
          <div className="flex gap-2 rounded-md bg-danger-100 p-2 text-danger-900">
            <AlertIcon />
            {live.error}
          </div>
        ) : (
          <LivePreview aria-label="Rendered code snippet example" />
        )}
        <div className="absolute right-0 top-0 flex items-center justify-center rounded bg-white/50">
          <button
            className="typography-body-10 flex items-center gap-1 p-1 pr-2 opacity-50 transition-opacity hover:opacity-100"
            ref={liveCodeToggleButton}
            onClick={() => toggleIsCodeVisible(state => !state)}
            aria-controls={codeId}
          >
            <>
              <BracketIcon width="14px" />
              {isCodeVisible ? 'Hide code' : 'Show code'}
            </>
          </button>
        </div>
      </div>
      <div
        id={codeId}
        className={clsx({ hidden: !isCodeVisible, block: isCodeVisible }, 'relative -mx-4 border-t border-muted-50')}
        onKeyDown={onLiveEditorContainerKeyDown}
      >
        <button
          onClick={copyLiveCode}
          className="typography-body-10 absolute right-0 top-0 p-1 pr-2 text-white opacity-50 transition-opacity hover:opacity-100"
        >
          Copy code
        </button>
        <LiveEditor
          tabMode="focus"
          aria-label="Live code editor, press the escape key to leave the editor"
          theme={themes.shadesOfPurple}
          code={live.code}
          language={live.language}
          disabled={live.disabled}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

const StaticCode = ({
  code,
  language = '', // By default render as plain text (ie. no language)
}: {
  code: string;
  language?: string;
}) => {
  return (
    <div className="relative overflow-hidden rounded-md">
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
      <Button className="absolute right-0 top-0" onClick={() => copy(code)}>
        Copy code
      </Button>
    </div>
  );
};

export type CodeProps = {
  children?: ReactNode;
  className?: string;
  live?: boolean;
  showCode?: boolean;
};
