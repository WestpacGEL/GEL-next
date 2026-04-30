import { Alert, Link, List, ListItem } from '@westpac/ui';
import { FieldErrors } from 'react-hook-form';

export function ErrorValidationAlert<T extends string = string>({
  errors,
}: {
  errors: FieldErrors<Record<T, unknown>>;
}) {
  const errorAmount = Object.entries(errors).length;

  return (
    <Alert look="danger">
      <strong>{`Please fix the following ${errorAmount} errors:`}</strong>
      <List type="unstyled">
        {Object.entries(errors)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value?.message)
          .map(([key]) => {
            const message = errors[key as T]?.message as string;
            return (
              <ListItem key={key}>
                <Link type="inline" href={`#${key}`} className="text-text-danger">
                  {message}
                </Link>
              </ListItem>
            );
          })}
      </List>
    </Alert>
  );
}
