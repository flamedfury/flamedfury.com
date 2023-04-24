---
title: Building and Automating My Now Page
description: How I built and automated my now page with Eleventy and APIs.
tags: [guide, eleventy]
date: 2023-04-19
---

I had tried something earlier on the bookshelf and recordshelf pages; they were populated by a similar method that I got off [Timothy Smith](http://web.archive.org/web/20210921075051/https://smithtimmytim.com/blog/2020/how-i-made-my-badass-listening-to-section/).

 It looked like this...

 {% imagePlaceholder "./src/assets/images/posts/2023-04-21-flamed-fury-top-albums.png", "A screenshot of the top albums section of flamedfury.com's Recordshelf page from August 2022", "Flamed Fury: Top Albums, July 2022" %}

 This version is inspired by [Corey](https://coryd.dev/) and his recent post [Building my /now page using Eleventy](https://coryd.dev/posts/2023/building-my-now-page-using-eleventy/).

 ## Eleventy Packages
 * [@11ty/eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/) allows us to fetch resources and cache them, avoiding hammering an API.
 * [@extractus/feed-extractor](https://github.com/extractus/feed-extractor) allows us to take an RSS feed and transforms it into JSON.
 * [dotenv](https://github.com/motdotla/dotenv) allows us to load environment variables from a `.env` file; this keeps them safe and out of public view.

 ``` bash
 npm install @11ty/eleventy-fetch @extractus/feed-extractor dotenv
 ```

 ## APIs and RSS feeds

 We need the help of some APIs, and RSS feeds to pull this off.

 * [Steam Web API Key](https://steamcommunity.com/dev/apikey). Fill in the details and grab your key.
 * [Steam ID](https://steamdb.info/calculator). Enter your username and look at the page for Steam ID.
 * [Last.fm Create API account](https://www.last.fm/api/account/create). Fill in the details and grab your key.
 * [Trakt User History](https://trakt.tv/users/YOURUSERNAME/history). Click the RSS icon to get a feed from the four available; All Types, Movies, Shows, and Episodes.

## Environment Variables

Once you have all your API keys, add them to a `.env` file. The `.env` file should live in your Eleventy projects root directory, not in `/src/`.

```bash
LASTFM_KEY=YOUR_TOKEN
LASTFM_USER=YOUR_USERNAME
TRAKT_KEY=YOUR_TRAKT_KEY
STEAM_KEY=YOUR_STEAM_KEY
STEAM_ID=YOUR_STEAM_ID
```

If you're using [Netlify](https://netlify.com) to build your site like I am, you must create these same variables in your project. In the Netlify UI, create site variables under `Site settings > Environment variables`. 

## Getting the data

Now the fun part. I'm not a developer and relied on the people mentioned in the intro paragraph to help me do this.

Create the following files in your Eleventy `_data` folder: `albums.js` `artists.js` `games.js` `movies.js` `tracks.js` `tv.js`.

All the requests are similar, swapping out the available methods in each API.

### Books

This is one that I already had in use. It collects my book reading data from my [metadata-library](https://github.com/flamedfury/metadata-library) from the GitHub user content API and allows me to use the data in my Eleventy project.

[metadataread.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/metadataread.js)
```js
const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  let url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/read.json'

  // returning promise

  let data = await EleventyFetch(url, {
    duration: '0s',
    type: 'json'
  });

  return data;
};
```

### Games
Call the Steam API using the `GetRecentlyPlayedGames` method. This will return the games in your account that have had playtime over the past two weeks. 

[games.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/games.js)
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

### Music
The Last.fm API calls are all similar. For albums, artists, and tracks, use `user.gettopalbums`, `user.gettopartists`, and `user.gettoptracks`, respectively. These calls return the top eight from the last seven days.

[albums.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/albums.js)
```js 
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const albums = await res
  return albums.topalbums.album
}
```

[artists.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/artists.js)
```js
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const artists = await res
  return artists.topartists.artist
}
```

[tracks.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/tracks.js)
```js
const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config({ systemvars: true });

module.exports = async function () {
  const API_KEY = process.env.LASTFM_KEY;
  const USERNAME = process.env.LASTFM_USER;
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&limit=8&format=json&period=7day`
  const res = EleventyFetch(url, {
    duration: '1h',
    type: 'json',
  })
  const tracks = await res
  return tracks.toptracks.track
}
```

### Media
Getting movie and TV data from Trakt is slightly different as they provide an RSS feed rather than an API. The end result is similar. The @extractis/feed-extractor package installed earlier transforms the atom feed into JSON for us to work with.

Trakt provides four feeds; use them as you need.

[tv.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/tv.js)
```js
const { extract } = require('@extractus/feed-extractor')
const { AssetCache } = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const TV_KEY = process.env.TRAKT_KEY
  const url = `https://trakt.tv/users/shadybrothers/history/shows/added.atom?slurm=${TV_KEY}`
  const asset = new AssetCache('tv_data')
  if (asset.isCacheValid('1h')) return await asset.getCachedValue()
  const res = await extract(url).catch((error) => { })
  const data = res.entries.splice(0, 5)
  await asset.save(data, 'json')
  return data
}
```

[movies.js](https://github.com/flamedfury/flamedfury.com/blob/main/src/_data/movies.js)
```js
const { extract } = require('@extractus/feed-extractor')
const { AssetCache } = require('@11ty/eleventy-fetch')

module.exports = async function () {
  const MOVIE_KEY = process.env.TRAKT_KEY
  const url = `https://trakt.tv/users/shadybrothers/history/movies/added.atom?slurm=${MOVIE_KEY}`
  const asset = new AssetCache('movie_data')
  if (asset.isCacheValid('1h')) return await asset.getCachedValue()
  const res = await extract(url).catch((error) => { })
  const data = res.entries.splice(0, 5)
  await asset.save(data, 'json')
  return data
}
```

## Displaying the data

I initially created a partial file with a Nunjucks loop for each of the sections of data we're collecting. I ran into formatting issues when I included these in the now page template file. [Aankhen](https://github.com/Aankhen) from the Eleventy Discord was able to help me out, and the solution was to include all the Nunjucks loops in the [now page template](https://github.com/flamedfury/flamedfury.com/blob/main/src/_layouts/now.njk).

The Nunjucks templates for displaying the data look like this (I've removed my style classes for readability).

### Books
The Nunjucks template for books loops through the data, looks for books with the status `started`, and displays the books I am reading as an unordered list. 

{% raw %}
```html
<article>
  <div>
    <h2>Reading: books</h2>
    <ul>
      {% for book in metadataread | reverse %}
        {% if book.status == 'started' %}
          <li>
            <a href="{{book.link}}">
              {{ book.title }}
            </a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
</article>
```
{% endraw %}

### Games
The Nunjucks loop for games loops through the game data and displays the games that I have played over the last two weeks as an  unordered list. 

{% raw %}
```html
<article>
  <div>
    <h2>Playing: games</h2>
    <ul>
      {% for game in games %}
        <li>
          {{ game.name }}
        </li>
      {% endfor %}
    </ul>
  </div>
</article>
```
{% endraw %}

### Music

The Nunjucks template loops through artists, tracks and albums and displays the data. Currently, the artists are displayed in an unordered list with a play count, and the tracks and albums are displayed in a responsive grid with the album art (most of the time).

{% raw %}
```html
<article>
  <div>
    <h2>Listening: artists</h2>
    {% for artist in artists %}
      <ul>
        <li>
          <a href="{{artist.url}}" title="{{artist.name | escape}}">{{artist.name}}</a>: {{artist.playcount}} plays
      </li>
      </ul>
    {% endfor %}
  </div>
</article>

<article>
  <div>
    <h2>Listening: tracks</h2>
    <div>
      {% for track in tracks %}
        <div>
          <img src="{{ track.image[3]['#text'] }}" alt="Album artwork for {{ item.name }} by {{ item.artist['#text'] }}" title="{{ item.name }} by {{ item.artist['#text'] }}">
          <p style="font-size: 1rem">
            <a href="{{track.url}}" title="{{track.name}}">{{track.artist.name}} - {{track.name}}</a>: {{track.playcount}} plays
        </p>
        </div>
      {% endfor %}
    </div>
  </div>
</article>

<article>
  <div>
    <h2>Listening: albums</h2>
    <div>
      {% for album in albums %}
        <div>
          <img src="{{album.image[3]['#text']}}" width="350" height="350" alt="The cover art for {{album.name}}">
          <p style="font-size: 1rem">
            <a href="{{album.url}}" title="{{album.name}}">{{album.name}} - {{album.artist.name}}</a>
          </p>
        </div>
      {% endfor %}
    </div>
  </div>
</article>
```
{% endraw %}

### Media

Finally, and to no surprise, the Nunjucks template loops through the movie and TV data and displays the last 5 movies and shows I've been watching in a simple unordered list.

{% raw %}
```html
<article>
  <div>
    <h2>Watching: tv</h2>
    {% for show in tv %}
      <ul>
        <li>
          <a href="{{show.link}}" title="{{show.title}}">
            {{show.title}}
          </a>
        </li>
      </ul>
    {% endfor %}
  </div>
</article>

<article>
  <div>
    <h2>Watching: movies</h2>
    {% for movie in movies %}
      <ul>
        <li>
          <a href="{{movie.link}}" title="{{movie.title}}">
            {{movie.title}}
          </a>
        </li>
      </ul>
    {% endfor %}
  </div>
</article>
```
{% endraw %}

## Amazing
There you have it, an (almost) beautiful and automated [now page](/now/). Let me know if you found this helpful or if it inspired you to make your own now page; I'd love to check it out.

There are a few things that I want to do to improve this page. If you know how I could solve these problems, please send me an [e-mail](mailto:flamed@flamedfury.com) or open a [pull request](https://github.com/flamedfury/flamedfury.com).

#### Things that I've not figured out how to do:
* Books: I use a [Github Action](https://github.com/katydecorah/read-action) to log book data pulls metadata from Google Books. This includes providing a URL to Google Books or the Play Store for book links. I want to be able to link to a non-Google website.
* Games: The `GetRecentlyPlayedGames` method returns the game's `appid` and `name`. I want to use those values to get the game cover art and store link to include on the now page.
* Music: The Last.fm API does not return photos of artists. Corey has shown me how [he is doing it](https://github.com/rknightuk/api/blob/main/services/lastfm.js), and I'm sure I can figure it out eventually.
* Music: Missing album art. Sometimes, new releases and obscure artists don't have cover art available on Last.fm. I would like to include a blank/default image to show in its place so I don't have a broken image.
