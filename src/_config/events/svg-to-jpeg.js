// https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/
// https://github.com/sophiekoonin/localghost/blob/main/src/plugins/og-to-png.js
// converts SVG to JPEG for open graph images

import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import Image from '@11ty/eleventy-img';
import dotenv from 'dotenv';

dotenv.config();

const ogImagesDir = './src/assets/og-images';

export const svgToJpeg = async function () {
  const socialPreviewImagesDir = 'dist/assets/og-images/';
  const files = await fsPromises.readdir(socialPreviewImagesDir);
  if (files.length > 0) {
    files.forEach(function (filename) {
      const outputFilename = filename.substring(0, filename.length - 4);
      if (
        filename.endsWith('.svg') && !fs.existsSync(path.join(ogImagesDir, outputFilename))
      ) {
        const imageUrl = socialPreviewImagesDir + filename;
        Image(imageUrl, {
          formats: ['jpeg'],
          outputDir: ogImagesDir,
          filenameFormat: function (id, src, width, format, options) {
            return `${outputFilename}.${format}`;
          }
        });
      }
    });
  } else {
    console.log('⚠ No social images found');
  }
};