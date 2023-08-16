---
title: 'Now Page: Automatically Syncing My Now Pages'
description: How I automatically sync my now page with omg.lol
tags:
  - eleventy
  - guides
date: 2023-07-23
---

The [32bit.cafe's](https://32bit.cafe) first [Community Code Jam](https://tilde.32bit.cafe/~hermit/community_jam_1/) has been running for the past week. I took the opportunity to take a look at how to automatically sync my [now page](/now/) to my [omg.lol now page](https://flamed.omg.lol/now).

I knew this was possible as [Robb](https://rknight.me/automating-my-now-page/) was already doing it and could point me in the right direction.

To automatically update my omg.lol now page with the latest updates to my now page, I needed to do the following:
- Create a new now page layout with omg.lol in mind.
- Save the output of the omg.lol now page template as a .txt file.
- Use the output of the .txt file to make an API call to api.omg.lol to update the omg.lol now page after the 11ty build process builds my website.

I created a new template layout file, [now-omg-layout.njk](https://github.com/flamedfury/flamedfury.com/blob/25129dae55077eeaa59eba1b36276269afe07c36/src/_layouts/now-omg-layout.njk) that includes the same data as my website's [now.njk](https://github.com/flamedfury/flamedfury.com/blob/25129dae55077eeaa59eba1b36276269afe07c36/src/_layouts/now.njk) template layout, but in a format that can be rendered by [omg.lol](https://omg.lol).

Then I created a new page, [now-omg-page.njk](https://github.com/flamedfury/flamedfury.com/blob/25129dae55077eeaa59eba1b36276269afe07c36/src/pages/now-omg-page.njk) that only contains YAML front matter that uses `now-omg-layout.njk` and outputs the contents as a simple text file [now-omg.txt](/now-omg.txt).

Finally, to make the magic happen, I defined a new function that makes the API call and updates my omg.lol now page.

```js
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

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
  updateOMGLol
};
```
Next, I needed to register a new event using `eleventyConfig.on('eleventy.after', callback)` in my `.eleventy.js` config file.

```js
// module import events
const { updateOMGLol } = require('./config/events/index.js');

 // 	--------------------- Events ---------------------
  eleventyConfig.on('eleventy.after', async () => {
    await updateOMGLol();
  });
```

Now whenever the 11ty build process is completed, the `updateOMGLol` function will be automatically called, making the [API call](https://api.omg.lol/address/flamed/now) with the data from the generated `now-omg.txt` file.

I don't know if I'm going to be hammering the omg.lol API whenever I'm working on the site locally and constantly building. If you know how I can cache the API request to reduce the number of calls I'm making, [let me know](/contact/)!