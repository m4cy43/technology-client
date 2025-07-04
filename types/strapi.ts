interface TextNode {
  text: string;
  type: 'text';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: 'link';
  url: string;
  children: TextNode[];
}

interface ParagraphContent {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
}

interface HeadingContent {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: TextNode[];
}

interface QuoteContent {
  type: 'quote';
  children: TextNode[];
}

interface ListItem {
  type: 'list-item';
  children: (TextNode | LinkNode)[];
}

interface ListContent {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItem[];
}

type Content = ParagraphContent | ListContent | HeadingContent | QuoteContent;

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
  provider_metadata: StrapiImageProviderMetadata;
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
  width: number | null;
  height: number | null;
  formats: MediaFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: StrapiImageProviderMetadata | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Service {
  id: number;
  title: string;
  content: Content[];
  image: StrapiMedia | null;
}

interface MainPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  hero: Service;
  aboutUs: Service;
  whatWeDo: Service[];
  whyChooseUs: Service;
  closing: Service;
}

interface StrapiMainPageResponse {
  data: MainPageData;
  meta: Record<string, unknown>;
}
interface StrapiImageProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface CompanyData {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string;
  phone: string;
  phone2: string;
  address: string;
  addressLink: string;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  favicon: StrapiMedia | null;
  logo: StrapiMedia | null;
  defaultSeo: unknown | null;
}

interface StrapiCompanyResponse {
  data: CompanyData;
  meta: Record<string, unknown>;
}

export type {
  // Main page
  StrapiMedia,
  MediaFormat,
  MediaFormats,
  TextNode,
  LinkNode,
  ParagraphContent,
  HeadingContent,
  QuoteContent,
  ListItem,
  ListContent,
  Service,
  Content,
  MainPageData,
  StrapiMainPageResponse,
  // Global
  StrapiImageProviderMetadata,
  CompanyData,
  StrapiCompanyResponse,
};
