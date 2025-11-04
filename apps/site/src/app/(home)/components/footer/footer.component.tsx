'use client';
import { Grid, GridContainer } from '@westpac/ui';
import { EmailIcon, PdfFileIcon } from '@westpac/ui/icon';

import { BrandKey } from '@/app/types/brand.types';
import { FigmaLogo } from '@/components/logos';

import { logoMap, logoStyles } from '../utils';

import { Circle, Link, Text, Title } from './components/helpers.component';

export function Footer({ gelEmail = '', guidelinesURL = '' }: { gelEmail?: string; guidelinesURL?: string }) {
  return (
    <div className="bg-gel-background">
      <GridContainer className="lg:!max-w-gel-lg-container lg:px-10">
        <Grid
          className={`
            gap-y-7 pt-9 pb-10
            xsl:gap-y-9 xsl:pt-10 xsl:pb-11
            sm:pt-13 sm:pb-14
            lg:pt-15 lg:pb-16
          `}
        >
          <div
            className={`
              col-span-12
              sm:col-span-8
              md:col-span-7
            `}
          >
            <Title>Design System</Title>
            <Grid
              tag="ul"
              className={`
                gap-y-1
                xsl:gap-y-2
                sm:gap-y-4
                lg:gap-y-2
              `}
            >
              {Object.entries(logoMap).map(([key, { logo: Logo, name }]) => {
                return (
                  <li
                    key={key}
                    className={`
                      col-span-12
                      xsl:col-span-6
                    `}
                  >
                    <Link href={`/design-system/${key}`}>
                      <Circle>
                        <Logo className={logoStyles({ brand: key as BrandKey, footer: true })} />
                      </Circle>
                      <Text>{name}</Text>
                    </Link>
                  </li>
                );
              })}
            </Grid>
          </div>
          <div
            className={`
              col-span-12
              sm:col-span-4
              md:col-start-9
            `}
          >
            <Title>Tools &amp; resources</Title>
            <Grid
              tag="ul"
              className={`
                gap-y-1
                xsl:gap-y-2
                sm:gap-y-4
                lg:gap-y-2
              `}
            >
              <li
                className={`
                  col-span-12
                  xsl:col-span-6
                  sm:col-span-12
                `}
              >
                <Link href="/articles/figma-libraries">
                  <Circle>
                    <FigmaLogo />
                  </Circle>
                  <Text>Figma UI Kits</Text>
                </Link>
              </li>
              <li
                className={`
                  col-span-12
                  xsl:col-span-6
                  sm:col-span-12
                `}
              >
                <Link href={guidelinesURL}>
                  <Circle>
                    <PdfFileIcon className="text-gel-icon" size={{ initial: 'medium', lg: 'large' }} />
                  </Circle>
                  <Text>Master Brand Guidelines</Text>
                </Link>
              </li>
              <li
                className={`
                  col-span-12
                  xsl:col-span-6
                  sm:col-span-12
                `}
              >
                <Link href={`mailto:${gelEmail}`}>
                  <Circle>
                    <EmailIcon className="text-gel-icon" size={{ initial: 'medium', lg: 'large' }} />
                  </Circle>
                  <Text>Contact GEL</Text>
                </Link>
              </li>
            </Grid>
          </div>
        </Grid>
      </GridContainer>
    </div>
  );
}
