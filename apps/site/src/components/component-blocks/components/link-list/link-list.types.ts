type LinkProps = {
  label: string;
  type: '_blank' | '_self';
  url: string;
};

export type LinkListProps = {
  links: LinkProps[];
};
