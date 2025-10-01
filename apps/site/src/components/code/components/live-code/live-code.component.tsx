import { AlertIcon, ArrowRightIcon, NewWindowIcon } from '@westpac/ui/icon';
import copy from 'clipboard-copy';
import { themes } from 'prism-react-renderer';
import { KeyboardEvent, useCallback, useContext, useId, useRef, useState } from 'react';
import { LiveContext, LiveEditor, LivePreview } from 'react-live';
import { useOverlayTriggerState } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveModal } from '@/app/design-system/[brand]/(client)/[...component]/components/content-tabs/components/responsive-modal-button';

import { Button } from '../../code.inject-components';

import { styles as liveCodeStyles } from './live-code.styles';
import { LiveCodeProps } from './live-code.types';

export function LiveCode({
  showCode = false,
  showResponsiveDemo: _showResponsiveDemo = false,
  enableLiveCode = true,
  className,
}: LiveCodeProps) {
  const liveCodeToggleButton = useRef<HTMLButtonElement>(null);
  const live = useContext(LiveContext);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const liveOnChange = live.onChange;
  const [localCopy, setLocalCopy] = useState<string>(live.code);
  const [isCodeVisible, toggleIsCodeVisible] = useState(showCode);
  const responsiveModalState = useOverlayTriggerState({});
  const showResponsiveDemo = live.language !== 'html' && _showResponsiveDemo;

  const styles = liveCodeStyles({
    showResponsiveDemo,
    isCodeVisible,
    language: live.language as VariantProps<typeof liveCodeStyles>['language'],
  });

  const copyLiveCode = useCallback(() => {
    void copy(localCopy);
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
        {showResponsiveDemo && (
          <Button
            className="absolute top-2 right-2 z-10"
            size="small"
            soft
            look="faint"
            onClick={() => responsiveModalState.open()}
          >
            <div className="flex items-center gap-1">
              <span>Demo</span> <NewWindowIcon size="xsmall" />
            </div>
          </Button>
        )}
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
              className="typography-body-10 border-l-border-muted-soft focus-visible:focus-outline flex items-center gap-1 border-l p-3 transition-opacity hover:opacity-100"
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
            theme={themes.oceanicNext}
            code={live.code}
            language={live.language}
            disabled={live.disabled}
            onChange={handleChange}
          />
        </div>
      )}
      <ResponsiveModal size="full" state={responsiveModalState} zIndex={1010}>
        <LivePreview aria-label="Rendered code snippet example" />
      </ResponsiveModal>
    </div>
  );
}
