import { DocumentElement } from '@keystatic/core';

export type RelatedInfoProps = {
  relatedArticles?: DocumentElement[];
  relatedComponents?: RelatedInfoLinks[];
};

export interface RelatedInfoLinks {
  slug: string;
  title: string;
}
