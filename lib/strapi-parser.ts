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

  const image = mediaToResponsiveHtml(service.image!, imageOptions);

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
  parseMainPageToHtml,
  serviceToHtml,
  contentToHtml,
  textNodeToHtml,
  linkNodeToHtml,
  mediaToHtml,
  mediaToResponsiveHtml,
  escapeHtml,
  parseRichText,
};

export type { ParsedBlock, ParsedMainPage, ImageOptions };
