export type ClusterArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ClusterArticleConfig = {
  path: string;
  primaryKeyword: string;
  title: string;
  h1: string;
  metaDescription: string;
  heroIntro: string;
  sections: ClusterArticleSection[];
  productHeading: string;
  productParagraphs: string[];
  productBullets: string[];
  faq: { question: string; answer: string }[];
};
