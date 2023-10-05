'use client';

import { Container, Grid, Item, List } from '@westpac/ui';

import { AlertBoxDemo, AlertTextDemo } from './demos';
import { Intro } from './intro';
import { RelatedInfo } from './related-info';
import { Section } from './section';
import { Heading, Link, SubHeading, Text } from './typography';

export function DesignContent() {
  return (
    <>
      <Intro />
      <Section>
        <Container>
          <Heading id="alert-boxes">Alert Boxes</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <Text>
                Alerts come in five different styles and are configurable to allow for simple styling, eg links, bold
                and italics. They come with a default icon and can be configured with or without close buttons. The info
                style Alert is the only style that allows flexibility in the icon used. Definitions and usage examples
                for each style are provided further down the page.
              </Text>
            </Item>
          </Grid>
          <AlertBoxDemo />
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="alert-text">Alert Text</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <Text>
                Alert text comes in four different styles and is configurable to allow for simple styling, eg links,
                bold and italics. It must be used with the defaulted icon to comply with accessibility guidelines, as
                per Alert boxes. Definitions and usage examples for each style are provided further down the page.
              </Text>
            </Item>
          </Grid>
          <AlertTextDemo />
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="user-experience">User experience</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <Text>
                Alert boxes are used to differentiate and emphasise inline messaging, they are simple functional
                elements designed to clearly separate messaging from content. Alerts can be configured with a close
                button to allow the message to be dismissed and removed from the content flow, they have a default icon
                to communicate meaning without colour.
              </Text>
              <Text>
                Use alerts to draw attention to specific messages in a particular context. They should be reserved for
                system responses, in context instructional messages, and warnings.
              </Text>
              <SubHeading>Alert types</SubHeading>
              <Text>
                Use alerts to draw attention to specific messages in a particular context. They should be reserved for
                system responses, in context instructional messages, and warnings.
              </Text>
              <Text>
                <strong>Success:</strong> The green message colour and tick icon is used to communicate successful
                completion of a process or task. It is commonly used with confirmation messaging, the intention is to
                provide confidence that a process has been completed successfully and the user can now move on.
              </Text>
              <Text>
                <strong>Information:</strong> The blue message colour and info icon is used to convey useful
                information. It should be used for things like instructions, feedback about information that has been
                provided, or high-level information about a system or process. This style provides flexibility to use a
                different icon. To remain accessible, do not use any of the default icons that are used for the other
                alert types.
              </Text>
              <Text>
                <strong>Warning</strong> The orange message colour and warning icon is for use in scenarios where the
                user needs to understand something before proceeding. It is saved for necessary messaging but not for
                error messages. For example, ‘this process will time-out in 3 min’ - use it as a ‘Watch out’, rather
                than a stop.
              </Text>
              <Text>
                <strong>Danger:</strong> The red message colour and danger icon is most commonly used for error
                messages, eg form validation. This alert is to bring the user’s attention to something that they must
                address before they can proceed, generally a resolvable issue.
              </Text>
              <Text>
                <strong>System:</strong> The System alert is for extraordinary circumstances where there is no way of
                proceeding. For example, the entire system has failed and there is no next step to offer the user.
              </Text>
            </Item>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="visual-design">Visual design</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              <Text>
                Alerts are intentionally designed to differ from the UI content which is typically styled using the
                brands colours etc. Alerts are not intended to be part of the brand, rather they exist as a separate
                graphic style which (if used correctly) gives them more emphasis and allows customers to understand the
                difference between content and messaging.
              </Text>
              <Text>
                Alerts convey meaning through colour and icons using a combination of carefully designed accessible
                colour and tint combinations. This <Link href="#">cross-brand, contextual colour palette</Link>, called
                Reserved colours is for alert messaging only.
              </Text>
            </Item>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading id="dos-and-donts">Do&apos;s and don&apos;ts</Heading>
          <Grid>
            <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
              {/* TODO: List is not overriding typography here for some reason so adding specificity temporarily until fixed  */}
              <List className="[&_li]:typography-body-9 [&_li]:leading-[2]">
                <List.Item>Avoid formatting alert text.</List.Item>
                <List.Item>
                  Don’t overuse alerts as this can diminish their effect and can make an experience feel broken.
                </List.Item>
                <List.Item>
                  Alerts shouldn&apos;t be used for marketing messaging as other critical messages will be ignored
                  through learned behaviours.
                </List.Item>
                <List.Item>
                  Don’t use the reserved colour palette for anything other than alert message components.
                </List.Item>
                <List.Item>
                  Don&apos;t alter the colours or tints that make up each of the alert message components or use
                  additional colours within the alert message.
                </List.Item>
                <List.Item>Don&apos;t alter the borders colour, radius etc</List.Item>
                <List.Item>
                  Avoid making alerts too complex. They&apos;re only intended to be simple feedback messages.
                </List.Item>
              </List>
            </Item>
          </Grid>
        </Container>
      </Section>
      <RelatedInfo />
    </>
  );
}
