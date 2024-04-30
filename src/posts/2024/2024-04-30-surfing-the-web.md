---
title: Surfing The Web And Sharing What I Find
description: How I surf the web, manage my online bookmarks and share exciting hyperlinks with the community.
tags:
  - web
  - eleventy
  - development
date: 2024-04-30
timestamp: 2024-04-30T07:22:47.637Z
---

If you've read my website for any amount of time, you'll know I'm a big web surfer. My [bookmarks page](/bookmarks/) and [bookmarks feed](/bookmarks-feed.xml) are excellent ways for me to share my more interesting finds with the wider community. 

This post has been in draft for **months**. I'm not kidding. I at least had it planned well over a year ago, but when I read the post "[How Do I Save Links For Later](https://chriscoyier.net/2023/08/20/how-do-i-save-links-for-later/)" by Chris Coyier and "[How I Read Online](https://minutestomidnight.co.uk/blog/how-i-read-online/)" by Simone Silvestroni did I actually put some words into the draft. 

And then it sat there for more months until [arevakhach](https://foreverliketh.is/) started the topic "[Tab & Bookmark Management](https://discourse.32bit.cafe/t/tab-bookmark-management/842) on the [32-Bit Forums](https://discourse.32bit.cafe/) did I actually sit down and flesh it out.

## Surfing the web

I surf the web on my desktop, laptop, tablet and phone. Yeah, that's a lot of devices, but they work great in different situations and places. 

Interesting links are collected as new tabs from places like [Mastodon](https://social.lol/@flamed/), Discord, [Forums](https://discourse.32bit.cafe/), my RSS reader and random surfing on places like [Search My Site](https://searchmysite.net/) or [Marginalia](https://search.marginalia.nu/).

Daily/weekly/monthly, I get overwhelmed with having too many tabs and lots of duplicate tabs open 🤣 (shoutout to [Anh](https://anhvn.com/)). I find some focus time to go through each open tab and give them a quick skim to see if it's something I want to sit down and read with my full attention.

I'll send the links I want to read later straight to Pocket. Otherwise, I'll close the tab and then feel satisfied with less than a dozen open tabs. Repeat for each device...

## Reading the web

First, I need to find some focus time. Usually, when the kids are out of the house, downtime at the airport while travelling or after the kids are in bed, and I'm not falling asleep watching [TV](/tags/tv/) on the couch. 

I'll Open Pocket on a computer, tablet or Kobo (rarely on the phone) and start reading my saved articles and posts. 

I'll Open Pocket on a computer, tablet, or Kobo (rarely on the phone) and start reading my saved articles and posts. If an article or post is interesting and I want to share it with the community, I'll favourite it, archive it, and copy the URL for sharing. Otherwise, the saved article is deleted.

## Sharing the web

This is the fun part. My workflow is made up of an [iOS Shortcut](https://github.com/katydecorah/bookmark-action/tree/main/shortcut#bookmark-shortcut), a [Github Action](https://github.com/katydecorah/read-action/), [Echo Feed](https://echofeed.app) and this website powered by [Eleventy](https://11ty.dev/).

I'll review all the articles I liked, and for the ones I feel are worth sharing on Flamed Fury, I'll copy the URL and trigger the action via a modified version of the shortcut mentioned above.

I enter a few details, like a quote from the text, a couple of my thoughts, and some related tags, along with the URL. The action saves the link to a JSON file in my metadata-library repository, which is then available to my 11ty project. 

Over in my 11ty project I have a data file aptly named `bookmarks.json` that uses Eleventy-Fetch to grab the bookmark data from the JSON file.

`_data/bookmarks.json`
{% raw %}
```js
const EleventyFetch = require('@11ty/eleventy-fetch');
const slugify = require('slugify');

module.exports = async function () {
  let url = 'https://raw.githubusercontent.com/flamedfury/metadata-library/main/_data/bookmarks.json'

  let data = await EleventyFetch(url, {
    duration: '1h',
    type: 'json'
  });

  return data;
};
```
{% endraw %}

The bookmark data is now available to use across Flamed Fury.

I use this data to create a collection and make sure that it's available in my 11ty config.

`config/collections.index.js`
{% raw %}
```js
const allBookmarks = collection => {
  const bookmarks = collection.getAll().filter(item => item.data.isBookmark);
  return bookmarks;
};

module.exports = {
  allBookmarks,
};
```
{% endraw %}

`eleventy.config.js`
{% raw %}
```js
const {allBookmarks} = require('./config/collections/index.js');

module.exports = eleventyConfig => {
  eleventyConfig.addCollection('allBookmarks', allBookmarks);
}
```
{% endraw %}

To generate the pages, I have an 11ty partial that generates the actual [Bookmarks page](/bookmarks/).

`_includes/partials/bookmarks.njk`
{% raw %}
```jinja2
<article>

  <ul>
    {% for bookmark in collections.allBookmarks | reverse %}
    <li>
      <div>
        <h2>
          <a href="{{ bookmark.url | url }}">{{ bookmark.data.title | safe }}</a>
        </h2>
        <div>
          <span>
            {% set definedDate = bookmark.date %} {% include "components/date.njk" %}
          </span>
        </div>
        <p>{{ bookmark.data.notes | truncate(100) | safe }}</p>
      </div>
    </li>
    {% endfor %}
  </ul>

</article>
```
{% endraw %}

Then, I use 11ty's pagination system to generate an individual page for each bookmark.

`pages/bookmark.njk`
{% raw %}
```yaml
---
layout: bookmark
pagination:
    data: bookmarks
    size: 1
    alias: bookmark
    addAllPagesToCollections: true
permalink: 'bookmarks/{{ bookmark.title | slugify }}/index.html'
isBookmark: true
eleventyComputed:
    title: "{{ bookmark.title | safe }}"
    sourceurl: "{{ bookmark.url }}"
    notes: "{{ bookmark.notes }}"
    date: "{% if bookmark.timestamp %}{{ bookmark.timestamp }}{% else %}{{ bookmark.date }}{% endif %}"
    hashtags: "{{ bookmark.tags }}"
---
    {% if bookmark.quote %}
    <blockquote>{{ bookmark.quote }}</blockquote>
    {% endif %}

    <p>
        {{ bookmark.notes }}
    </p>
```
{% endraw %}

Finally, 11ty generates both an [RSS](/bookmarks-feed.xml) and [JSON](/bookmarks-feed.json) feed with the same bookmark collection data.

`bookmarks-feed-json.njk`
{% raw %}
```json
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "{{ meta.feeds.bookmarks.name | safe }}",
  "home_page_url": "{{ meta.url }}/",
  "feed_url": "{{ meta.url }}/bookmarks-feed.json",
  "description": "{{ meta.feeds.bookmarks.description }}",
  "author": {
    "name": "{{ meta.author.name }}",
    "url": "{{ meta.url }}",
    "avatar": "{{ meta.author.avatar }}",
    "email": "{{ meta.author.email }}"
  },
  "items": [
    {% for bookmark in collections.allBookmarks | reverse %}
      {
        "id": "{{ meta.url }}{{ bookmark.url }}",
        "url": "{{ meta.url }}{{ bookmark.url }}",
        "title": "{{ bookmark.data.title }}",
        "content_html": "{{ bookmark.templateContent | replace('\n', '') | replace('    ', '') | replace('"', '\\"') | safe }}",
        "date_published": "{{ bookmark.data.date }}",
        "external_url": "{{ bookmark.data.sourceurl }}",
        "tags": [{% if bookmark.data.hashtags %}{% for tag in bookmark.data.hashtags | split(',') %}"{{ tag.trim() }}"{% if not loop.last %}, {% endif %}{% endfor %}{% endif %}]
      }{% if not loop.last %},{% endif %}
    {% endfor %}
  ]
}
```
{% endraw %}

The JSON feed powers an Echo on [Echo Feed](https://echofeed.app), which shares the bookmark to my [Mastodon account](https://social.lol/@flamed) and I enjoy seeing all the boosts and favourites from the community!

{% raw %}
```jinja2
🔖 New bookmark: {{ title }} 

🔗 {{ external_link }}

{{ content:markdown }}

🔥 {{ link }}

{{ hashtags }}
```
{% endraw %}

Phew...

## The rest of the web
I have a stack of old bookmarks saved in the browser but never access them; I'm considering nuking them entirely. How many 404s are bookmarked in there?

Despite this magnificent workflow, I still have too many tabs open and need to figure out a strategy for storing and sorting non-articles that I want to share. Maybe by utilising the browser's bookmark function, which I only just considered nuking? These tabs are open and relate to on-the-go or yet-to-start projects. Dreams are free, right?

Happy web surfing, and remember to share!