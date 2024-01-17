'use client';

import { Grid, GridItem, Modal } from '@westpac/ui';
import { DesktopIcon, GelIcon, PhoneIcon, TabletIcon } from '@westpac/ui/icon';

import { Container } from '@/app/design-system/components';

import { ResponsiveModalProps } from '.';

export function ResponsiveModal({ children, ...props }: ResponsiveModalProps) {
  return (
    <Modal isDismissable className="bg-light" {...props}>
      <Modal.Body className="flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col pt-5">
          <div className="flex justify-between">
            <h2 className="typography-body-7 font-light sm:typography-body-6">Responsive Demo</h2>
            <GelIcon color="primary" size="xlarge" />
          </div>
          <div className="relative mb-3 mt-4 flex justify-center">
            <div className="absolute inset-x-0 top-2 flex h-4 w-full items-center justify-between before:h-full before:border-l before:border-l-text after:h-full after:border-l after:border-l-text">
              <div className="flex-1 border-t border-t-text" />
            </div>
            <div className="z-10 flex gap-2 rounded border border-text bg-white px-3 py-2">
              <PhoneIcon className="opacity-100 xsl:opacity-50" />
              <TabletIcon className="opacity-50 xsl:opacity-100 md:opacity-50" />
              <TabletIcon className="rotate-90 opacity-50 md:opacity-100 lg:opacity-50" />
              <DesktopIcon className="opacity-50 lg:opacity-100" />
            </div>
          </div>
          <div className="relative flex-1 overflow-auto">
            <div className="relative z-10">{children}</div>
            <div className="pointer-events-none absolute inset-0 touch-none">
              <Grid className="absolute inset-0">
                {new Array(12).fill(null).map((_, index) => (
                  <GridItem key={index} span={1} className="bg-text/5" />
                ))}
              </Grid>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
