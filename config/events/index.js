const fs = require('fs');
const Image = require('@11ty/eleventy-img');
const dotenv = require('dotenv');
dotenv.config();

// https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/
// concerts SVG to JPEG for open graph images

const svgToJpeg = function () {
  const socialPreviewImagesDir = 'dist/assets/images/social-preview/';
  fs.readdir(socialPreviewImagesDir, (err, files) => {
    if (!!files && files.length > 0) {
      files.forEach(fileName => {
        if (fileName.endsWith('.svg')) {
          let imageUrl = socialPreviewImagesDir + fileName;
          Image(imageUrl, {
            formats: ['jpeg'],
            outputDir: './' + socialPreviewImagesDir,
            filenameFormat: function (id, src, width, format, options) {
              let outputFileName = fileName.substring(0, fileName.length - 4);
              return `${outputFileName}.${format}`;
            }
          });
        }
      });
    } else {
      console.log('⚠ No social images found');
    }
  });
};

async function updateOMGLol() {
  const omglolkey = process.env.OMG_LOL_KEY;
  const data = fs.readFileSync('./dist/now-omg.txt', 'utf8');

  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default("https://api.omg.lol/address/flamed/now", {
      method: 'post',
      headers: {
        Authorization: `Bearer ${omglolkey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: data,
        listed: 1,
      })
    });

    if (response.ok) {
      console.log('✅ Updated');
    } else {
      console.error(`❌ API call failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ API call failed:', error.message);
  }
}

module.exports = {
  svgToJpeg,
  updateOMGLol
};