/**
 * Generates an optimized SVG shortcode with optional attributes.
 *
 * @param {string} svgName - The name of the SVG file (without the .svg extension).
 * @param {string} [ariaName=''] - The ARIA label for the SVG.
 * @param {string} [className=''] - The CSS class name for the SVG.
 * @param {string} [styleName=''] - The inline style for the SVG.
 * @returns {Promise<string>} The optimized SVG shortcode.
 */

const { optimize } = require('svgo');
const { readFileSync } = require('node:fs');

const svgShortcode = async (svgName, ariaName = '', className = '', styleName = '') => {
  const svgData = readFileSync(`src/_includes/svg/${svgName}.svg`, 'utf8');

  const { data } = await optimize(svgData);

  return data.replace(
    /<svg(.*?)>/,
    `<svg$1 ${ariaName ? `aria-label="${ariaName}" role="img"` : 'aria-hidden="true"'} ${className ? `class="${className}"` : ''} ${styleName ? `style="${styleName}"` : ''} >`
  );
};

module.exports = svgShortcode;