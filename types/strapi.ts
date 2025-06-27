interface TextNode {
  text: string;
  type: 'text';
}

interface ParagraphContent {
  type: 'paragraph';
  children: TextNode[];
}

interface ListItem {
  type: 'list-item';
  children: TextNode[];
}

interface ListContent {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItem[];
}

type BodyContent = ParagraphContent | ListContent;

interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface MediaFormats {
  large?: MediaFormat;
  medium?: MediaFormat;
  small?: MediaFormat;
  thumbnail?: MediaFormat;
}

interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: MediaFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface AboutUsSection {
  id: number;
  title: string;
  body: BodyContent[];
  images: StrapiMedia | null;
}

interface WhatWeDoSection {
  id: number;
  title: string;
  body: BodyContent[];
  images: StrapiMedia | null;
}

interface WhyChooseUsSection {
  id: number;
  title: string;
  body: BodyContent[];
  images: StrapiMedia | null;
}

interface ClosingSection {
  id: number;
  title: string;
  body: BodyContent[];
  images?: StrapiMedia | null;
}

interface MainPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  hero: StrapiMedia | null;
  aboutUs: AboutUsSection;
  whatWeDo: WhatWeDoSection[];
  whyChooseUs: WhyChooseUsSection;
  closing: ClosingSection;
}

interface StrapiMainPageResponse {
  data: MainPageData;
  meta: Record<string, unknown>;
}

type SectionWithImages =
  | AboutUsSection
  | (WhatWeDoSection & { images: StrapiMedia });
type SectionWithOptionalImages =
  | WhatWeDoSection
  | WhyChooseUsSection
  | ClosingSection;

export type {
  StrapiMedia,
  MediaFormat,
  MediaFormats,
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
  SectionWithImages,
  SectionWithOptionalImages,
};
