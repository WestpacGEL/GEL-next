import { DocumentElement } from '@keystatic/core';

type CloudImage = { alt: string; height: number | null | undefined; src: string; width: number | null | undefined };

export type Article = {
  author: string | null;
  cardTitle: string | null;
  content: DocumentElement[];
  description?: string;
  image: CloudImage;
  name: string;
  smallDescription: string | null;
  thumbnail: CloudImage;
};
