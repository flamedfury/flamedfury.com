import { optimize } from 'svgo';
import { readFileSync } from 'node:fs';

export async function svgShortcode(svgName, ariaName = '', className = '', styleName = '') {
  const svgData = readFileSync(`src/_includes/svg/${svgName}.svg`, 'utf8');

  const { data } = await optimize(svgData);

  return data.replace(
    /<svg(.*?)>/,
    `<svg$1 ${ariaName ? `aria-label="${ariaName}" role="img"` : 'aria-hidden="true"'} ${className ? `class="${className}"` : ''} ${styleName ? `style="${styleName}"` : ''} >`
  );
}