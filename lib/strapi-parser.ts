import {
  StrapiMainPageResponse,
  Service,
  Content,
  TextNode,
  LinkNode,
  ListItem,
} from '@/types/strapi';

interface ParsedBlock {
  title: string;
  content: string;
}

interface ParsedMainPage {
  pageTitle: string;
  blocks: ParsedBlock[];
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
 * Converts a Service block to HTML
 */
function serviceToHtml(service: Service): ParsedBlock {
  const htmlContent = service.content
    .map((content) => contentToHtml(content))
    .join('');

  return {
    title: service.title,
    content: htmlContent,
  };
}

/**
 * Parses the main page data and converts to HTML
 */
function parseMainPageToHtml(response: StrapiMainPageResponse): ParsedMainPage {
  const { data } = response;
  const blocks: ParsedBlock[] = [];

  // Parse hero section
  if (data.hero) {
    blocks.push(serviceToHtml(data.hero));
  }

  // Parse aboutUs section
  if (data.aboutUs) {
    blocks.push(serviceToHtml(data.aboutUs));
  }

  // Parse whatWeDo sections
  if (data.whatWeDo && data.whatWeDo.length > 0) {
    data.whatWeDo.forEach((service) => {
      blocks.push(serviceToHtml(service));
    });
  }

  // Parse whyChooseUs section
  if (data.whyChooseUs) {
    blocks.push(serviceToHtml(data.whyChooseUs));
  }

  // Parse closing section
  if (data.closing) {
    blocks.push(serviceToHtml(data.closing));
  }

  return {
    pageTitle: data.title,
    blocks: blocks.filter((block) => block.content.trim().length > 0),
  };
}

/**
 * Utility function to escape HTML characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Alternative escapeHtml for Node.js environments
function escapeHtmlNode(text: string): string {
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
  escapeHtml,
  escapeHtmlNode,
};

export type { ParsedBlock, ParsedMainPage };
