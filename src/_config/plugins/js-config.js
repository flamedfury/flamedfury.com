import esbuild from 'esbuild';
import path from 'path';

export const jsConfig = eleventyConfig => {
  eleventyConfig.addTemplateFormats('js');

  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (content, inputPath) => {
      // Skip processing if not in the designated scripts directories
      if (!inputPath.startsWith('./src/assets/scripts/')) {
        return;
      }

      // Inline scripts processing
      if (inputPath.startsWith('./src/assets/scripts/bundle/')) {
        const filename = path.basename(inputPath);
        const outputFilename = filename;
        const outputPath = `./src/_includes/scripts/${outputFilename}`;

        await esbuild.build({
          entryPoints: [inputPath],
          outfile: outputPath,
          bundle: true,
          minify: true,
          platform: 'browser', // Specify browser as the target platform
          target: 'es2020',
          format: 'esm', // Use ES modules
        });
        return;
      }

      // Default handling for other scripts, excluding inline scripts
      return async () => {
        let output = await esbuild.build({
          entryPoints: [inputPath],
          bundle: true,
          minify: true,
          write: false,
          platform: 'browser', // Specify browser as the target platform
          target: 'es2020',
          format: 'esm', // Use ES modules
        });

        return output.outputFiles[0].text;
      };
    }
  });
};
