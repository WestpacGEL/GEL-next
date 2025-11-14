import { Alert, Link, List, ListItem } from '@westpac/ui';
import { type FieldErrors } from 'react-hook-form';

export function ErrorValidationAlert<T extends string = string>({
  errors,
  labels,
}: {
  errors: FieldErrors<Record<T, unknown>>;
  labels?: Record<T, string>;
}) {
  const errorAmount = Object.entries(errors).length;
  return (
    <Alert look="danger">
      <strong>{`Please fix the ${errorAmount} errors listed below`}</strong>
      <List type="unstyled">
        {Object.entries(errors)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value?.message)
          .map(([key]) => (
            <ListItem key={key}>
              <Link type="inline" href={`#${key}`} className="text-text-danger">
                {(labels && labels[key as T]) || key}
              </Link>
            </ListItem>
          ))}
      </List>
    </Alert>
  );
}
