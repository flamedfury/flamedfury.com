import * as esbuild from 'esbuild';

export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('js');
  eleventyConfig.ignores.add("./src/**/*.11tydata.js");

  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compileOptions: {
      permalink: true, // Set this to true to retain permalink functionality in JS
    },
    compile: async (content, path) => {
      if (!path.startsWith('./src/assets/scripts/')) {
        return;
      }

      if (path === './src/assets/scripts/theme-toggle.js') {
        await esbuild.build({
          target: 'es2020',
          entryPoints: [path],
          outfile: './src/_includes/theme-toggle-inline.js',
          bundle: true,
          minify: true
        });
        return;
      }

      return async () => {
        let output = await esbuild.build({
          target: 'es2020',
          entryPoints: [path],
          minify: true,
          bundle: true,
          write: false
        });

        return output.outputFiles[0].text;
      };
    }
  });
}