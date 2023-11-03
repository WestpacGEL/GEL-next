import { DocumentElement } from '@keystatic/core';

export type Article = {
  author: string | null;
  content: DocumentElement[];
  description?: string;
  image: string | null;
  name: string;
  smallDescription: string | null;
  thumbnail: string | null;
};
