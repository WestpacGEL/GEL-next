import { components, MultiValueGenericProps } from 'react-select';

export function MultiselectMultiValueContainer({
  children,
  textMultivalue,
  ...props
}: MultiValueGenericProps & { textMultivalue?: boolean }) {
  const data = props.data as { value: string; label: string };

  return (
    <components.MultiValueContainer {...props}>
      {textMultivalue ? `${data.label}, ` : children}
    </components.MultiValueContainer>
  );
}
