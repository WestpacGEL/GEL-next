import { DocumentElement } from '@keystatic/core';

export type Article = {
  author: string | null;
  content: DocumentElement[];
  description?: string;
  smallDescription?: string;
  image: string | null;
  name: string;
  thumbnail: string | null;
};
