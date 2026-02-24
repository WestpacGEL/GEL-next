import { DocumentElement } from '@keystatic/core';

export type RelatedInfoProps = {
  relatedArticles?: DocumentElement[];
  relatedComponents?: { heading?: string; icon?: 'tag' | 'cube'; links?: RelatedInfoLinks[] };
};

export type RelatedInfoLinks = {
  slug: string;
  title: string;
};
