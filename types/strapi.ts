// Base text node interface
interface TextNode {
  text: string;
  type: 'text';
}

// Paragraph content interface
interface ParagraphContent {
  type: 'paragraph';
  children: TextNode[];
}

// List item interface
interface ListItem {
  type: 'list-item';
  children: TextNode[];
}

// List content interface
interface ListContent {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItem[];
}

// Union type for body content
type BodyContent = ParagraphContent | ListContent;

// About Us section interface
interface AboutUsSection {
  id: number;
  title: string;
  body: BodyContent[];
}

// What We Do section interface
interface WhatWeDoSection {
  id: number;
  title: string;
  body: BodyContent[];
}

// Why Choose Us section interface
interface WhyChooseUsSection {
  id: number;
  title: string;
  body: BodyContent[];
}

// Closing section interface
interface ClosingSection {
  id: number;
  title: string;
  body: BodyContent[];
}

// Main data interface
interface MainPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  hero: string;
  aboutUs: AboutUsSection;
  whatWeDo: WhatWeDoSection[];
  whyChooseUs: WhyChooseUsSection;
  closing: ClosingSection;
}

// Main Strapi response interface
interface StrapiMainPageResponse {
  data: MainPageData;
  meta: Record<string, unknown>;
}

// Export all interfaces
export type {
  TextNode,
  ParagraphContent,
  ListItem,
  ListContent,
  BodyContent,
  AboutUsSection,
  WhatWeDoSection,
  WhyChooseUsSection,
  ClosingSection,
  MainPageData,
  StrapiMainPageResponse,
};
