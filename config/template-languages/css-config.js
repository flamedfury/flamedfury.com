import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssImportExtGlob from 'postcss-import-ext-glob';
import tailwindcss from 'tailwindcss';
import postcssRelativeColorSyntax from '@csstools/postcss-relative-color-syntax';
import autoprefixer from 'autoprefixer';

export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compileOptions: {
      permalink: true, // Set this to true to retain permalink functionality in CSS
    },
    compile: async (content, path) => {
      if (path !== './src/assets/css/global.css') {
        return;
      }

      return async () => {
        let output = await postcss([
          postcssImportExtGlob,
          postcssImport,
          tailwindcss,
          postcssRelativeColorSyntax({ preserve: true }),
          autoprefixer
        ]).process(content, {
          from: path
        });

        return output.css;
      };
    }
  });
}