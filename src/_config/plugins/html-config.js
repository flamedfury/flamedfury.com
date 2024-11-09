import jsBeautify from 'js-beautify';

const { html: htmlBeautify } = jsBeautify;

export const htmlConfig = eleventyConfig => {
  eleventyConfig.addTransform('html-prettify', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      // Split the content into parts
      const parts = content.split(/<\/?(?:head|body)>/i);

      // Prettify each part separately
      const prettifiedParts = parts.map((part, index) => {
        // Don't prettify the content of script tags
        const scriptProtected = part.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, match => {
          return `<!--SCRIPTSTART${match}SCRIPTEND-->`;
        });

        const prettified = htmlBeautify(scriptProtected, {
          indent_size: 2,
          indent_char: ' ',
          max_preserve_newlines: 2,
          preserve_newlines: true,
          keep_array_indentation: false,
          break_chained_methods: false,
          indent_scripts: 'keep',
          brace_style: 'collapse',
          space_before_conditional: true,
          unescape_strings: false,
          jslint_happy: false,
          end_with_newline: true,
          wrap_line_length: 0,
          indent_inner_html: false,
          comma_first: false,
          e4x: false,
          indent_empty_lines: false
        });

        // Restore script tags
        return prettified.replace(/<!--SCRIPTSTART([\s\S]*?)SCRIPTEND-->/g, (match, p1) => p1);
      });

      // Rejoin the parts
      return prettifiedParts.join('');
    }
    return content;
  });
};
