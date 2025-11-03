import { BackButton } from '../back-button/back-button';
import { Cta } from '../cta/cta';
import { CustomHeading } from '../custom-heading/custom-heading';

export function FormWrapper({
  children,
  formId,
  handleSubmit,
}: {
  children: React.ReactNode;
  formId?: string;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div>
      <BackButton>Back to something</BackButton>
      <CustomHeading>Quick Contact</CustomHeading>
      <form id={formId} onSubmit={handleSubmit}>
        {children}
      </form>
      <Cta secondary="Back" tertiary="Cancel">
        Next
      </Cta>
    </div>
  );
}
