'use client';

import { Grid, GridContainer, GridItem, Modal, ModalBody } from '@westpac/ui';
import { useWindowSize } from 'usehooks-ts';

import { ResponsiveModalProps } from '.';

export function ResponsiveModal({ children, ...props }: ResponsiveModalProps) {
  const { width = 0 } = useWindowSize();

  return (
    <Modal isDismissable {...props}>
      <ModalBody className="flex flex-1 flex-col px-0" id="demo-content">
        <GridContainer fixed className="flex flex-1 flex-col pt-5">
          <h2 className="typography-body-7 font-black xsl:typography-body-6">
            Viewport: <span className="font-light">{width}px</span>
          </h2>
          <div className="relative mb-3 mt-4 flex justify-center">
            <div className="absolute inset-x-0 top-2 flex h-4 w-full items-center justify-between before:h-full before:border-l before:border-l-border after:h-full after:border-l after:border-l-border">
              <div className="flex-1 border-t border-t-border" />
            </div>
            <div className="z-10 flex h-8 w-12 items-center justify-center rounded-[5.625rem] border border-border bg-white font-black">
              <span className="xsl:hidden">Xs</span>
              <span className="hidden xsl:max-sm:block">Xsl</span>
              <span className="hidden sm:max-md:block">Sm</span>
              <span className="hidden md:max-lg:block">Md</span>
              <span className="hidden lg:max-xl:block">Lg</span>
              <span className="hidden xl:block">Xl</span>
            </div>
          </div>
          <div className="relative flex-1 overflow-auto">
            <div className="relative z-10">{children}</div>
            <div className="pointer-events-none absolute inset-0 touch-none">
              <Grid className="absolute inset-0">
                {new Array(12).fill(null).map((_, index) => (
                  <GridItem key={index} span={1} className="bg-background" />
                ))}
              </Grid>
            </div>
          </div>
        </GridContainer>
      </ModalBody>
    </Modal>
  );
}
