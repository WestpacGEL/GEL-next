import { AlertIcon, ArrowRightIcon } from '@westpac/ui/icon';
import copy from 'clipboard-copy';
import { themes } from 'prism-react-renderer';
import { KeyboardEvent, useCallback, useContext, useId, useRef, useState } from 'react';
import { LiveContext, LiveEditor, LivePreview } from 'react-live';
import { VariantProps } from 'tailwind-variants';

import { styles as liveCodeStyles } from './live-code.styles';
import { LiveCodeProps } from './live-code.types';

export function LiveCode({ showCode = false, enableLiveCode = true, className }: LiveCodeProps) {
  const liveCodeToggleButton = useRef<HTMLButtonElement>(null);
  const live = useContext(LiveContext);

  const liveOnChange = live.onChange;
  const [localCopy, setLocalCopy] = useState<string>(live.code);
  const [isCodeVisible, toggleIsCodeVisible] = useState(showCode);

  console.log('live.language', live.language);
  const styles = liveCodeStyles({
    isCodeVisible,
    language: live.language as VariantProps<typeof liveCodeStyles>['language'],
  });

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
    <div className={styles.base({ className })}>
      <div className={styles.displayWrapper({})}>
        {live.error ? (
          <div className={styles.error({})}>
            <AlertIcon />
            {live.error}
          </div>
        ) : (
          <LivePreview aria-label="Rendered code snippet example" />
        )}
        {enableLiveCode && (
          <div className={styles.buttonWrapper({})}>
            <button
              className="typography-body-10 border-l-border flex items-center gap-1 border-l p-3 transition-opacity hover:opacity-100"
              ref={liveCodeToggleButton}
              onClick={() => toggleIsCodeVisible(state => !state)}
              aria-controls={codeId}
            >
              <>
                {isCodeVisible ? 'Hide live code' : 'Show live code'}
                <ArrowRightIcon color="primary" className={styles.arrowIcon({})} />
              </>
            </button>
          </div>
        )}
      </div>
      {enableLiveCode && (
        <div id={codeId} className={styles.codeWrapper({})} onKeyDown={onLiveEditorContainerKeyDown}>
          <button onClick={copyLiveCode} className={styles.copyCodeButton({})}>
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
      )}
    </div>
  );
}
