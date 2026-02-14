import { OperationKey } from "../../types/operations";

export interface OperationMeta {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
}

export interface OperationHero {
  title: string;
  description: string;
  bulletPoints: string[];
  imageAlt: string;
}

export interface OperationHowTo {
  title: string;
  steps: string[];
  note?: string;
}

export interface OperationContent {
  key: OperationKey;
  slug: string;
  mode: OperationKey;
  meta: OperationMeta;
  hero: OperationHero;
  benefitsTitle: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  howTo: OperationHowTo;
  useCasesTitle: string;
  useCases: string[];
}
