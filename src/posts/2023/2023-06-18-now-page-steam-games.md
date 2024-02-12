---
title: Adding game cover art to my /now page
description: How I'm using Eleventy-Fetch and the Steam API to fetch recently played games, the games cover art and store page URL to display on my /now page.
tags:
  - eleventy
  - guides
date: 2023-06-19
---

In a recent post, [Building and Automating My Now Page](/posts/building-and-automating-my-now-page/), I retrieved my recently played Steam games using the Steam API with the following code.

```js
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.STEAM_KEY;
  const STEAMID = process.env.STEAM_ID;
  const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAMID}&format=json`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const game = await res
  return game.response.games
}
```

The result was an unordered list of the game name. It looked fine, but I wanted something better. I knew that I wanted to display the game's cover art on the page, but the `GetRecentlyPlayedGames` method didn't return anything image related. 

With my limited developer knowledge, I reached out to ChatGPT to see if it could help me build what I was picturing in my head. 

I asked it, "Here's my code; what do I need to do to get the game's cover art as well?"

It replied, "To fetch the game's cover art and display it along with the game name, you can modify your existing code as follows":

```js
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.STEAM_KEY;
  const STEAMID = process.env.STEAM_ID;
  const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAMID}&format=json`;
  const res = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  });
  const games = res.response.games;

  const gamesWithCoverArt = await Promise.all(
    games.map(async (game) => {
      const gameDetailsUrl = `http://store.steampowered.com/api/appdetails?appids=${game.appid}`;
      const gameDetailsRes = await EleventyFetch(gameDetailsUrl, {
        duration: '1h',
        type: 'json',
      });

      const gameDetails = gameDetailsRes[game.appid].data;
      if (gameDetails && gameDetails.hasOwnProperty('header_image')) {
        const coverArtUrl = gameDetails.header_image;
        const coverArtRes = await fetch(coverArtUrl);
        const coverArtBuffer = await coverArtRes.arrayBuffer();
        const coverArtArray = Array.from(new Uint8Array(coverArtBuffer));
        const coverArtBase64 = Buffer.from(coverArtArray).toString('base64');
        game.coverArt = `data:image/png;base64,${coverArtBase64}`;
      } else {
        game.coverArt = null;
      }

      return game;
    })
  );

  return gamesWithCoverArt;
};
```

It also provided a simple explanation.

> The modified code uses the fetch function provided by Eleventy to retrieve the cover art image for each game.

* Inside the map function, the game details are fetched using the constructed `gameDetailsUrl`.
* If the game details include the `header_image` property, the cover art image is fetched using fetch.
* The fetched cover art image is then converted to a base64-encoded string and assigned to the `coverArt` property of the game object.
* If the game details do not have a `header_image property`, the `coverArt` property of the game object is set to null.
* The modified code returns an array of games, each containing the appid, name, `playtime_2weeks`, `playtime_forever`, `img_icon_url`, `playtime_windows_forever`, `playtime_mac_forever`, `playtime_linux_forever`, and `coverArt` properties.

With these modifications, the code ensures that the `coverArt` property is correctly populated with the base64-encoded cover art image data (if available) or null (if unavailable). This lets you access the game information, including the cover art image, in the Nunjucks template.

The Nunjucks template now looks like this:

{% raw %}
```html
<article class="region">
  <div class="wrapper flow">
    <h2>Playing: games</h2>
    <div class="grid" style="--grid-min-item-size: 20rem">
      {% for game in games %}
        <div class="flow">
          {% if game.coverArt %}
            <img src="{{ game.coverArt }}" alt="An image of the cover art for the game {{ game.name }}"/>
          {% endif %}
          <div class="game-name">{{ game.name }}</div>
        </div>
      {% endfor %}
    </div>
  </div>
</article>
```
{% endraw %}

Next, I wanted to provide a link to the game’s page on the Steam Store. This can be done by modifying the function to include the `steamUrl` property.

```js
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.STEAM_KEY;
  const STEAMID = process.env.STEAM_ID;
  const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${STEAMID}&format=json`;
  const res = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  });
  const games = res.response.games;

  const gamesWithCoverArt = await Promise.all(
    games.map(async (game) => {
      const gameDetailsUrl = `http://store.steampowered.com/api/appdetails?appids=${game.appid}`;
      const gameDetailsRes = await EleventyFetch(gameDetailsUrl, {
        duration: '1h',
        type: 'json',
      });

      const gameDetails = gameDetailsRes[game.appid].data;
      if (gameDetails && gameDetails.hasOwnProperty('header_image')) {
        const coverArtUrl = gameDetails.header_image;
        const coverArtRes = await fetch(coverArtUrl);
        const coverArtBuffer = await coverArtRes.arrayBuffer();
        const coverArtArray = Array.from(new Uint8Array(coverArtBuffer));
        const coverArtBase64 = Buffer.from(coverArtArray).toString('base64');
        game.coverArt = `data:image/png;base64,${coverArtBase64}`;
      } else {
        game.coverArt = null;
      }

      const steamUrl = `https://store.steampowered.com/app/${game.appid}`;
      game.steamUrl = steamUrl;

      return game;
    })
  );

  return gamesWithCoverArt;
};
```

After fetching the game details, we create the `steamUrl` using the `game.appid` and assign it to the `steamUrl` property of the game object.

The `steamUrl` is constructed as `https://store.steampowered.com/app/${game.appid}`.

The Nunjucks loop can be updated to use `game.steamUrl` for the hyperlink.

{% raw %}
```html
<article class="region">
  <div class="wrapper flow">
    <h2>Playing: games</h2>
    <div class="grid" style="--grid-min-item-size: 20rem">
      {% for game in games %}
        <div class="flow">
          {% if game.coverArt %}
            <img src="{{ game.coverArt }}" alt="An image of the cover art for the game {{ game.name }}"/>
          {% endif %}
          <div class="game-name">
            <a href="{{ game.steamUrl }}" title="{{ game.name | escape }}">{{ game.name }}</a>
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
</article>
```
{% endraw %}

The games section of the [/now](/now/) page now looks like this:

{% imagePlaceholder "./src/assets/images/posts/2023-06-19-now-page-playing-games.png", "A screenshot of the playing games section of the now page on flamedfury.com. It show's two games box cover art.", "Recently played games, now with cover art" %}

I made a commit, pushed it to main, and waited for Netlify to build and deploy. 

FAILURE. 

```shell
8:56:50 PM: [11ty] Unhandled rejection in promise: (more in DEBUG output)
8:56:50 PM: [11ty] fetch is not defined (via ReferenceError)
8:56:50 PM: [11ty]
8:56:50 PM: [11ty] Original error stack trace: ReferenceError: fetch is not defined
8:56:50 PM: [11ty]     at /opt/build/repo/src/_data/games.js:25:29
8:56:50 PM: [11ty]     at async Promise.all (index 0)
8:56:50 PM: [11ty]     at async module.exports (/opt/build/repo/src/_data/games.js:14:29)
8:56:50 PM: [11ty]     at async TemplateData.getDataValue (/opt/build/repo/node_modules/@11ty/eleventy/src/TemplateData.js:524:23)
8:56:50 PM: [11ty]     at async TemplateData.getAllGlobalData (/opt/build/repo/node_modules/@11ty/eleventy/src/TemplateData.js:307:18)
8:56:50 PM: [11ty]     at async /opt/build/repo/node_modules/@11ty/eleventy/src/TemplateData.js:361:26
8:56:50 PM: ERROR: "build:11ty" exited with 1.
8:56:50 PM: ​
8:56:50 PM: "build.command" failed                                        
```

I had to ask ChatGPT what was up. Why is this failing? We're using `eleventy-fetch`, not `node-fetch` etc. 

The next suggestion was to try the `isomorphic-fetch` package and make it a requirement in `games.js`.

```bash
npm install isomorphic-fetch
```

```js
require('isomorphic-fetch');
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

// Rest of my code...
```

Apparently, requiring `isomorphic-fetch` will polyfill the fetch function for both Node.js and browser environments.

SUCCESS. My site was deploying again. But why did making `isomorphic-fetch` a requirement fix it?

ChatGPT was able to explain it...

>When your code runs on a website, like your project deployed on Netlify, it needs a way to communicate with other servers and fetch data from them. This communication is done using a function called fetch(). However, the fetch() function is not available by default in all environments.
>
>In your case, when you were building your project with Eleventy, which uses Node.js behind the scenes, the fetch() function was not available. This caused an error because your code was trying to use fetch() but couldn't find it.
>
>To solve this problem, we added a package called isomorphic-fetch. Think of it as a special tool that provides the fetch() function for Node.js environments like Eleventy, so your code can use it.
>
>The isomorphic-fetch package works like a magic bridge. It understands how to talk to servers and fetch data, just like the fetch() function in web browsers. By adding this package, we made sure that your code could use the fetch() function, even when running in the Eleventy build process on the server.
>
>So, by adding isomorphic-fetch and requiring it in your code, we provided the missing fetch() function, and everything started working correctly. It's like giving your code a special tool so it can talk to other servers and get the data it needs.
>
> -- ChatGPT

Fantastic, my [/now](/now) page displays my most recently played games from the past two weeks, their beautiful cover art, and a store page link. 

I wonder if I'll be able to get ChatGPT to help me do the same things for my Blizzard games.

The next problem to solve is cover art for music, television and movies.