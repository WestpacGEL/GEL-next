'use client';

import { Button, Grid, GridContainer, GridItem, Modal, ModalBody } from '@westpac/ui';
import { useWindowSize } from 'usehooks-ts';

import { ResponsiveModalProps } from '.';

export function ResponsiveModal({ children, state, ...props }: ResponsiveModalProps) {
  const { width = 0 } = useWindowSize();

  return (
    <Modal isDismissable={false} state={state} {...props}>
      <ModalBody className={`relative flex flex-1 flex-col bg-background-white px-0`}>
        <Button className="absolute top-3 right-3" look="primary" soft onClick={() => state.close()}>
          Close
        </Button>
        <GridContainer fixed className="flex flex-1 flex-col pt-5" id="demo-content">
          <h2
            className={`
              typography-body-7 font-black text-text-heading
              xsl:typography-body-6
            `}
          >
            Viewport: <span className="font-light">{width}px</span>
          </h2>
          <div className="relative mt-4 mb-3 flex justify-center">
            <div
              className={`
                absolute inset-x-0 top-2 flex h-4 w-full items-center
                justify-between
                before:h-full before:border-l before:border-l-border-muted-soft
                after:h-full after:border-l after:border-l-border-muted-soft
              `}
            >
              <div className="flex-1 border-t border-t-border-muted-mild" />
            </div>
            <div
              className={`
                z-10 flex h-8 w-12 items-center justify-center
                rounded-[5.625rem] border border-border-muted-mild
                bg-background-white font-black text-text-body
              `}
            >
              <span className="xsl:hidden">Xs</span>
              <span
                className={`
                  hidden
                  xsl:max-sm:block
                `}
              >
                Xsl
              </span>
              <span
                className={`
                  hidden
                  sm:max-md:block
                `}
              >
                Sm
              </span>
              <span
                className={`
                  hidden
                  md:max-lg:block
                `}
              >
                Md
              </span>
              <span
                className={`
                  hidden
                  lg:max-xl:block
                `}
              >
                Lg
              </span>
              <span
                className={`
                  hidden
                  xl:block
                `}
              >
                Xl
              </span>
            </div>
          </div>
          <div className="relative flex-1 overflow-auto">
            <div className="relative z-10 py-7">{children}</div>
            <div className="pointer-events-none absolute inset-0 touch-none">
              <Grid className="absolute inset-0">
                {new Array(12).fill(null).map((_, index) => (
                  <GridItem key={index} span={1} className={`bg-surface-muted-faint`} />
                ))}
              </Grid>
            </div>
          </div>
        </GridContainer>
      </ModalBody>
    </Modal>
  );
}
