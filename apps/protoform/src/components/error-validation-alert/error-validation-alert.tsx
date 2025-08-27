import { Alert, Link, List, ListItem } from '@westpac/ui';

export type ValidationErrorType = {
  id: string;
  label: string;
};

export function ErrorValidationAlert({ errors }: { errors: ValidationErrorType[] }) {
  const errorAmount = errors.length;

  return (
    <Alert look="danger">
      <strong>{`Please fix the ${errorAmount} errors listed below`}</strong>
      <List type="unstyled">
        {errors.map(error => (
          <ListItem key={error.id}>
            <Link type="inline" href={`#${error.id}`} className="text-text-danger">
              {error.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Alert>
  );
}
