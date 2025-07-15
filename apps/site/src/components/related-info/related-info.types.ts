import { DocumentElement } from '@keystatic/core';

export type RelatedInfoProps = {
  relatedArticles?: DocumentElement[];
  relatedComponents?: RelatedInfoLinks[];
};

export type RelatedInfoLinks = {
  slug: string;
  title: string;
};
