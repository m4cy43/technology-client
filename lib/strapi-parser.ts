import {
  StrapiMainPageResponse,
  Service,
  Content,
  TextNode,
  LinkNode,
  ListItem,
  StrapiMedia,
} from '@/types/strapi';

interface ParsedBlock {
  title: string;
  content: string;
  image: string;
}

interface ParsedMainPage {
  pageTitle: string;
  blocks: ParsedBlock[];
}

interface ImageOptions {
  preferredSize?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original';
  includeCaption?: boolean;
  includeFigure?: boolean;
  lazyLoading?: boolean;
  className?: string;
  id?: string;
  baseUrl?: string;
  preferredWidth?: number;
  preferredHigh?: number;
}

interface SimpleParagraph {
  type: 'paragraph';
  text: string;
}

interface SimpleList {
  type: 'list';
  format: 'ordered' | 'unordered';
  items: string[];
}

type SimpleContent = SimpleParagraph | SimpleList;

interface SimpleBlock {
  title: string;
  content: SimpleContent[];
  image: StrapiMedia | null;
}

interface SimpleMainPage {
  pageTitle: string;
  blocks: SimpleBlock[];
}

/**
 * Converts a TextNode to HTML with formatting
 */
function textNodeToHtml(node: TextNode): string {
  let html = escapeHtml(node.text);

  if (node.bold) html = `<strong>${html}</strong>`;
  if (node.italic) html = `<em>${html}</em>`;
  if (node.underline) html = `<u>${html}</u>`;
  if (node.strikethrough) html = `<s>${html}</s>`;
  if (node.code) html = `<code>${html}</code>`;

  return html;
}

/**
 * Converts a LinkNode to HTML
 */
function linkNodeToHtml(node: LinkNode): string {
  const linkText = node.children.map((child) => textNodeToHtml(child)).join('');
  return `<a href="${escapeHtml(node.url)}">${linkText}</a>`;
}

/**
 * Converts a list item to HTML
 */
function listItemToHtml(item: ListItem): string {
  const content = item.children
    .map((child) => {
      if (child.type === 'text') {
        return textNodeToHtml(child);
      } else if (child.type === 'link') {
        return linkNodeToHtml(child);
      }
      return '';
    })
    .join('');

  return `<li>${content}</li>`;
}

/**
 * Converts various content types to HTML
 */
function contentToHtml(content: Content): string {
  switch (content.type) {
    case 'paragraph':
      const paragraphContent = content.children
        .map((child) => {
          if (child.type === 'text') {
            return textNodeToHtml(child);
          } else if (child.type === 'link') {
            return linkNodeToHtml(child);
          }
          return '';
        })
        .join('');
      return `<p>${paragraphContent}</p>`;

    case 'heading':
      const headingContent = content.children
        .map((child) => textNodeToHtml(child))
        .join('');
      return `<h${content.level}>${headingContent}</h${content.level}>`;

    case 'quote':
      const quoteContent = content.children
        .map((child) => textNodeToHtml(child))
        .join('');
      return `<blockquote>${quoteContent}</blockquote>`;

    case 'list':
      const listItems = content.children
        .map((item) => listItemToHtml(item))
        .join('');
      const listTag = content.format === 'ordered' ? 'ol' : 'ul';
      return `<${listTag}>${listItems}</${listTag}>`;

    default:
      return '';
  }
}

/**
 * Converts StrapiMedia to HTML image element
 */
function mediaToHtml(media: StrapiMedia, options: ImageOptions): string {
  const {
    preferredSize = 'original',
    includeCaption = true,
    includeFigure = true,
    lazyLoading = true,
    className = '',
    id = '',
    baseUrl,
    preferredWidth,
    preferredHigh,
  } = options;

  // Determine the best image source
  let imageUrl = media.url;
  let width = preferredWidth || media.width;
  let height = preferredHigh || media.height;

  // Try to get preferred size format
  if (media.formats && preferredSize !== 'original') {
    const format = media.formats[preferredSize];
    if (format) {
      imageUrl = format.url;
      width = format.width;
      height = format.height;
    }
  }

  // Add base URL if provided
  const fullUrl = baseUrl ? `${baseUrl}${imageUrl}` : imageUrl;

  // Build img attributes
  const imgAttributes: string[] = [
    `src="${escapeHtml(fullUrl)}"`,
    `alt="${escapeHtml(media.alternativeText || media.name || '')}"`,
    `width="${width}"`,
    `height="${height}"`,
  ];

  if (lazyLoading) {
    imgAttributes.push('loading="lazy"');
  }

  if (className) {
    imgAttributes.push(`class="${escapeHtml(className)}"`);
  }

  if (id) {
    imgAttributes.push(`id="${escapeHtml(id)}"`);
  }

  const imgTag = `<img ${imgAttributes.join(' ')} />`;

  // Wrap in figure if requested
  if (includeFigure) {
    let figureContent = imgTag;

    if (includeCaption && media.caption) {
      figureContent += `\n    <figcaption>${escapeHtml(media.caption)}</figcaption>`;
    }

    return `<figure>\n    ${figureContent}\n</figure>`;
  }

  return imgTag;
}

/**
 * Generates responsive image HTML with srcset
 */
function mediaToResponsiveHtml(
  media: StrapiMedia,
  options: ImageOptions
): string {
  const {
    includeCaption = true,
    includeFigure = true,
    lazyLoading = true,
    className = '',
    id = '',
    baseUrl,
  } = options;

  if (!media.formats) {
    return mediaToHtml(media, options);
  }

  // Build srcset from available formats
  const srcsetParts: string[] = [];
  const formats = media.formats;

  if (formats.thumbnail) {
    srcsetParts.push(
      `${baseUrl}${formats.thumbnail.url} ${formats.thumbnail.width}w`
    );
  }
  if (formats.small) {
    srcsetParts.push(`${baseUrl}${formats.small.url} ${formats.small.width}w`);
  }
  if (formats.medium) {
    srcsetParts.push(
      `${baseUrl}${formats.medium.url} ${formats.medium.width}w`
    );
  }
  if (formats.large) {
    srcsetParts.push(`${baseUrl}${formats.large.url} ${formats.large.width}w`);
  }

  // Use original as fallback
  const fallbackUrl = baseUrl + media.url;

  const imgAttributes: string[] = [
    `src="${escapeHtml(fallbackUrl)}"`,
    `alt="${escapeHtml(media.alternativeText || media.name || '')}"`,
    `width="${media.width}"`,
    `height="${media.height}"`,
  ];

  if (srcsetParts.length > 0) {
    imgAttributes.push(`srcset="${srcsetParts.join(', ')}"`);
    imgAttributes.push(
      'sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"'
    );
  }

  if (lazyLoading) {
    imgAttributes.push('loading="lazy"');
  }

  if (className) {
    imgAttributes.push(`class="${escapeHtml(className)}"`);
  }

  if (id) {
    imgAttributes.push(`id="${escapeHtml(id)}"`);
  }

  const imgTag = `<img ${imgAttributes.join(' ')} />`;

  if (includeFigure) {
    let figureContent = imgTag;

    if (includeCaption && media.caption) {
      figureContent += `\n    <figcaption>${escapeHtml(media.caption)}</figcaption>`;
    }

    return `<figure>\n    ${figureContent}\n</figure>`;
  }

  return imgTag;
}

function parseRichText(content: Content[]) {
  return content.map((content) => contentToHtml(content)).join('');
}

/**
 * Converts a Service block to HTML with image
 */
function serviceToHtml(
  service: Service,
  imageOptions: ImageOptions
): ParsedBlock {
  const htmlContent = parseRichText(service.content);

  const image = service.image
    ? mediaToResponsiveHtml(service.image, imageOptions)
    : '';

  return {
    title: service.title,
    content: htmlContent,
    image,
  };
}

/**
 * Parses the main page data and converts to HTML with images
 */
function parseMainPageToHtml(
  response: StrapiMainPageResponse,
  imageOptions: ImageOptions = {}
): ParsedMainPage {
  const { data } = response;
  const blocks: ParsedBlock[] = [];

  // Parse hero section
  if (data.hero) {
    blocks.push(serviceToHtml(data.hero, imageOptions));
  }

  // Parse aboutUs section
  if (data.aboutUs) {
    blocks.push(serviceToHtml(data.aboutUs, imageOptions));
  }

  // Parse whatWeDo sections
  if (data.whatWeDo && data.whatWeDo.length > 0) {
    data.whatWeDo.forEach((service) => {
      blocks.push(serviceToHtml(service, imageOptions));
    });
  }

  // Parse whyChooseUs section
  if (data.whyChooseUs) {
    blocks.push(serviceToHtml(data.whyChooseUs, imageOptions));
  }

  // Parse closing section
  if (data.closing) {
    blocks.push(serviceToHtml(data.closing, imageOptions));
  }

  return {
    pageTitle: data.title,
    blocks: blocks.filter(
      (block) => block.content.trim().length > 0 || block.image
    ),
  };
}

/**
 * Extracts plain text from TextNode or LinkNode (ignoring formatting)
 */
function extractPlainText(node: TextNode | LinkNode): string {
  if (node.type === 'text') {
    return node.text;
  } else if (node.type === 'link') {
    return node.children.map((child) => child.text).join('');
  }
  return '';
}

/**
 * Extracts plain text from list item
 */
function extractListItemText(item: ListItem): string {
  return item.children.map((child) => extractPlainText(child)).join('');
}

/**
 * Converts rich content to simple content structure
 */
function contentToSimple(content: Content): SimpleContent | null {
  switch (content.type) {
    case 'paragraph':
      const paragraphText = content.children
        .map((child) => extractPlainText(child))
        .join('');

      return {
        type: 'paragraph',
        text: paragraphText,
      };

    case 'list':
      const listItems = content.children
        .map((item) => extractListItemText(item))
        .filter((text) => text.trim().length > 0);

      return {
        type: 'list',
        format: content.format,
        items: listItems,
      };

    // Skip headings, quotes, and other content types for simplicity
    default:
      return null;
  }
}

function parseSimpleRichText(content: Content[]) {
  return content
    .map((content) => contentToSimple(content))
    .filter((content): content is SimpleContent => content !== null);
}

/**
 * Converts a Service block to simple structure
 */
function serviceToSimple(service: Service): SimpleBlock {
  const simpleContent = parseSimpleRichText(service.content);

  return {
    title: service.title,
    content: simpleContent,
    image: service.image,
  };
}

/**
 * Parses the main page data to simple structure
 */
function parseMainPageToSimple(
  response: StrapiMainPageResponse
): SimpleMainPage {
  const { data } = response;
  const blocks: SimpleBlock[] = [];

  // Parse hero section
  if (data.hero) {
    blocks.push(serviceToSimple(data.hero));
  }

  // Parse aboutUs section
  if (data.aboutUs) {
    blocks.push(serviceToSimple(data.aboutUs));
  }

  // Parse whatWeDo sections
  if (data.whatWeDo && data.whatWeDo.length > 0) {
    data.whatWeDo.forEach((service) => {
      blocks.push(serviceToSimple(service));
    });
  }

  // Parse whyChooseUs section
  if (data.whyChooseUs) {
    blocks.push(serviceToSimple(data.whyChooseUs));
  }

  // Parse closing section
  if (data.closing) {
    blocks.push(serviceToSimple(data.closing));
  }

  return {
    pageTitle: data.title,
    blocks: blocks.filter((block) => block.content.length > 0 || block.image),
  };
}

/**
 * Utility function to escape HTML characters
 */
function escapeHtml(text: string): string {
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Fallback for Node.js environments
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export {
  // HTML parsing functions
  parseMainPageToHtml,
  serviceToHtml,
  contentToHtml,
  textNodeToHtml,
  linkNodeToHtml,
  mediaToHtml,
  mediaToResponsiveHtml,
  parseRichText,
  parseSimpleRichText,
  escapeHtml,
  parseMainPageToSimple,
  serviceToSimple,
  contentToSimple,
  extractPlainText,
  extractListItemText,
};

export type {
  ParsedBlock,
  ParsedMainPage,
  ImageOptions,
  SimpleBlock,
  SimpleMainPage,
  SimpleContent,
  SimpleParagraph,
  SimpleList,
};
