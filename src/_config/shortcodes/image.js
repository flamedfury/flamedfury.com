import Image from '@11ty/eleventy-img';
import path from 'node:path';

/**
 * Converts an attribute map object to a string of HTML attributes.
 * @param {Object} attributeMap - The attribute map object.
 * @returns {string} - The string of HTML attributes.
 */
const stringifyAttributes = attributeMap => {
  return Object.entries(attributeMap)
    .map(([attribute, value]) => {
      if (typeof value === 'undefined') return '';
      return `${attribute}="${value}"`;
    })
    .join(' ');
};

/**
 * Generates an HTML image element with responsive images and optional caption.
 * @param {string} src - The path to the image source file.
 * @param {string} [alt=''] - The alternative text for the image.
 * @param {string} [caption=''] - The caption for the image.
 * @param {string} [loading='lazy'] - The loading attribute for the image.
 * @param {string} [className] - The CSS class name for the image element.
 * @param {string} [sizes='90vw'] - The sizes attribute for the image.
 * @param {number[]} [widths=[440, 650, 960, 1200]] - The widths for generating responsive images.
 * @param {string[]} [formats=['webp', 'jpeg']] - The formats for generating responsive images.
 * @returns {string} - The HTML image element.
 */
export const imageShortcode = async (
  src,
  alt = '',
  caption = '',
  loading = 'lazy',
  className,
  sizes = '90vw',
  widths = [440, 650, 960, 1200],
  formats = ['webp', 'jpeg'],
  page // Add page as a new argument
) => {
  const metadata = await Image(src, {
    widths: [...widths],
    formats: [...formats],
    urlPath: '/assets/images/generated/',
    outputDir: './dist/assets/images/generated/',
    filenameFormat: (id, src, width, format, options) => {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  const lowsrc = metadata.jpeg[metadata.jpeg.length - 1];

  // Adjust image path handling
  let imgSrc = src;
  if (!imgSrc.startsWith('.') && page) { // Ensure page is defined
    const inputPath = page.inputPath;
    const pathParts = inputPath.split('/');
    pathParts.pop();
    imgSrc = `${pathParts.join('/')}/${src}`;
  }

  const imageSources = Object.values(metadata)
    .map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
        .map(entry => entry.srcset)
        .join(', ')}" sizes="${sizes}">`;
    })
    .join('\n');

  const imgageAttributes = stringifyAttributes({
    src: lowsrc.url,
    width: lowsrc.width,
    height: lowsrc.height,
    alt,
    loading,
    decoding: 'async'
  });

  const imageElement = caption
    ? `<figure slot="image" class="flow ${className ? `${className}` : ''}">
				<picture>
					${imageSources}
					<img ${imgageAttributes}>
				</picture>
				<figcaption>${caption}</figcaption>
			</figure>`
    : `<picture slot="image" class="flow ${className ? `${className}` : ''}">
				${imageSources}
				<img ${imgageAttributes}>
			</picture>`;

  return imageElement;
};