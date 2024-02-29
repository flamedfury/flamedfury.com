---
title: Building My Comics Page
description: How I built my comics page using League of Comic Geeks, a NodeJS module and Eleventy.
tags:
  - comics
  - eleventy
  - development
date: 2024-02-29
---

My comics page has been 🚧 under construction 🚧 for around four years. 

Recently, [xandra's](https://xandra.cc/) post on our forum about [library and book management software for your website](https://discourse.32bit.cafe/t/library-and-book-management-software-for-your-website/418) reignited my motivation for organising my comic book collection.

My aim was to create a catalogue of my comics, access my collection data, and use it to build my comics page.

I searched for tools to catalogue my comic book collection and found two options - League of Comic Geeks and [CLZ Comics](https://www.collectorz.com/comic).

However, neither provided an API or a feed to retrieve my collection data. [Give me a web feed or an API for everything](https://coryd.dev/posts/2024/give-me-a-web-feed-or-an-api-for-everything/), damnit! While CLZ Comics is a paid product, League of Comic Geeks allowed me to get started immediately, so I decided to go with it. 

To get around the lack of API or Feed, I found a neat NodeJS module, [comicgeeks](https://github.com/maruf99/comicgeeks), that can retrieve data from League of Comic Geeks; excellent.

To begin, I added a series to my collection - [House of X](https://leagueofcomicgeeks.com/profile/ketylust/collection/141932) and [Powers of X](https://leagueofcomicgeeks.com/profile/ketylust/collection/141931), the fantastic mini-series that marked the beginning of Hickman's new era of X-Men in 2019. 

Finally, I installed the `comicgeeks` module to my project by running the command `npm install comicgeeks --save-dev` and explored the data structure returned by League.

Starting with one of the documented examples, I created a function that fetches my collection and prints the returned data to the console:

```js
const {
    CollectionTypes,
    fetchCollection,
    fetchUser,
    SortTypes
} = require('comicgeeks');

fetchUser('ketylust')
    .then(async user => {
        // Fetch the collection
        const collection = await fetchCollection(user.id, CollectionTypes.Series, {
            sort: SortTypes.AlphaAsc
        });

        // Print the collection to the console
        console.log(collection);

    })
    .catch(console.error);
```

The returned data looked like this:

```json
[
  {
        "name": "House of X",
        "publisher": "Marvel Comics",
        "url": "https://leagueofcomicgeeks.com/profile/ketylust/collection/141932",
        "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-2523615.jpg"
    },
  {
        "name": "Powers of X",
        "publisher": "Marvel Comics",
        "url": "https://leagueofcomicgeeks.com/profile/ketylust/collection/141931",
        "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4309479.jpg"
  }
]
```

Besides missing details like the published date, this was looking good. I could then change the collection type to issues to check out what the issue data looked like.

```js
const {
    CollectionTypes,
    fetchCollection,
    fetchUser,
    SortTypes
} = require('comicgeeks');

fetchUser('ketylust')
    .then(async user => {
        // Fetch the collection
        const collection = await fetchCollection(user.id, CollectionTypes.Issues, {
            sort: SortTypes.AlphaAsc
        });

        // Print the collection to the console
        console.log(collection);

    })
    .catch(console.error);
```

The returned data looked like this (just showing issue #1 for brevity):

```json
[
  {
    "name": "House of X #1",
    "publisher": "Marvel Comics",
    "url": "https://leagueofcomicgeeks.com/comic/4678747/house-of-x-1",
    "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4678747.jpg?1699942708",
    "description": "FACE THE FUTURE! Superstar writer Jonathan Hickman (SECRET WARS, AVENGERS, FANTASTIC FOUR) takes the reins of the X-Men universe! Since the release of Uncanny X-Men #1, there have been four seminal moments in the history...",
    "price": "$5.99",
    "rating": null,
    "pulls": null,
    "potw": null
  },
  {
    "name": "Powers of X #1",
    "publisher": "Marvel Comics",
    "url": "https://leagueofcomicgeeks.com/comic/4517621/powers-of-x-1",
    "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4517621.jpg?1701563454",
    "description": "FEAR THE FUTURE! Superstar writer Jonathan Hickman (INFINITY, NEW AVENGERS, FF) continues his revolutionary new direction for the X-Men. Intertwining with HOUSE OF X, POWERS OF X reveals the secret past, present and future...",
    "price": "$5.99",
    "rating": null,
    "pulls": null,
    "potw": null
  }
]
```

Pretty good, still missing date info, but enough data to start populating the page. 

One thing, I can't use data printed to the console in a Nunjucks loop. Luckily [eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/) allows us to store data not retrieved from an API endpoint to the cache using AssetCache. After a quick chat in the Eleventy Community Discord, it was suggested that I use the [manual storage of my own data in the cache](https://www.11ty.dev/docs/plugins/fetch/#manually-store-your-own-data-in-the-cache) example to build upon my function to save my data as a JSON file in the cache:

```js
const { CollectionTypes, fetchCollection, fetchUser, SortTypes } = require('comicgeeks');
const { AssetCache } = require('@11ty/eleventy-fetch');

module.exports = async function () {
    // Define a unique cache key for your comic book data
    const cacheKey = "comic_collection";

    // Create a new AssetCache instance with your cache key
    let asset = new AssetCache(cacheKey);

    // Check if the cache is fresh within the last day
    if (asset.isCacheValid("1d")) {
        // Return cached data.
        return asset.getCachedValue();
    }

    try {
        // Fetch user data
        const user = await fetchUser('ketylust');

        // Fetch the collection
        const collection = await fetchCollection(user.id, CollectionTypes.Issues, {
            sort: SortTypes.AlphaAsc
        });

        // Save the fetched collection data into Eleventy's cache
        await asset.save(collection, "json");

        // Return the fetched collection data
        return collection;
    } catch (error) {
        console.error("Error fetching comic collection:", error);
        return []; // Return an empty array in case of error
    }
};
```

This was great; I put together a simple grid that iterates through the comics data to display the twelve HoX/PoX series issues:

{% raw %}
```jinja2
<div class="grid">
    {% for comic in comics %}
    <div class="comics">
        <img src="{{ comic.cover }}" alt="Cover Image for {{ comic.name }}" load="lazy">
    </div>
    {% endfor %}
</div>
```
{% endraw %}

This works well for a collection of twelve comics, but what about when I added the other 500+ comics in my collection? Displaying the collection by series was the way to go. I modified my function to fetch issues and series and combine the results:

```js
/** snipped **/
        // Fetch the collection by series
        const seriesCollection = await fetchCollection(user.id, CollectionTypes.Series, {
            sort: SortTypes.AlphaAsc
        });

        // Fetch the collection by issue
        const issueCollection = await fetchCollection(user.id, CollectionTypes.Issue, {
            sort: SortTypes.AlphaAsc
        });

        // Combine series and issue collections
        const collection = [...seriesCollection, ...issueCollection];
/** snipped **/
```

This was great, but the combined data meant I had issues with the same keys used for issues and series:

```json
[
  {
        "name": "House of X",
        "publisher": "Marvel Comics",
        "url": "https://leagueofcomicgeeks.com/profile/ketylust/collection/141932",
        "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-2523615.jpg"
    },
  {
        "name": "Powers of X",
        "publisher": "Marvel Comics",
        "url": "https://leagueofcomicgeeks.com/profile/ketylust/collection/141931",
        "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4309479.jpg"
  },
  {
    "name": "House of X #1",
    "publisher": "Marvel Comics",
    "url": "https://leagueofcomicgeeks.com/comic/4678747/house-of-x-1",
    "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4678747.jpg?1699942708",
    "description": "FACE THE FUTURE! Superstar writer Jonathan Hickman (SECRET WARS, AVENGERS, FANTASTIC FOUR) takes the reins of the X-Men universe! Since the release of Uncanny X-Men #1, there have been four seminal moments in the history...",
    "price": "$5.99",
    "rating": null,
    "pulls": null,
    "potw": null
  },
  {
    "name": "Powers of X #1",
    "publisher": "Marvel Comics",
    "url": "https://leagueofcomicgeeks.com/comic/4517621/powers-of-x-1",
    "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4517621.jpg?1701563454",
    "description": "FEAR THE FUTURE! Superstar writer Jonathan Hickman (INFINITY, NEW AVENGERS, FF) continues his revolutionary new direction for the X-Men. Intertwining with HOUSE OF X, POWERS OF X reveals the secret past, present and future...",
    "price": "$5.99",
    "rating": null,
    "pulls": null,
    "potw": null
  }
]
```

I wanted to separate the issues and series data into their own arrays with their own keys so that I could iterate over either. I modified the function to do this:

```js
/** snipped **/
        // Separate series and issue data
        const data = {
            series: seriesCollection,
            issue: issueCollection
        };
/** snipped **/
```

My data now looked like this:

```json
{
  "series": [
    {
      "name": "House of X",
      "publisher": "Marvel Comics",
      "url": "https://leagueofcomicgeeks.com/profile/ketylust/collection/141932",
      "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-2523615.jpg"
    },
    {
      "name": "Powers of X",
      "publisher": "Marvel Comics",
      "url": "https://leagueofcomicgeeks.com/profile/ketylust/collection/141931",
      "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4309479.jpg"
    }
  ],
  "issue": [
    {
      "name": "House of X #1",
      "publisher": "Marvel Comics",
      "url": "https://leagueofcomicgeeks.com/comic/4678747/house-of-x-1",
      "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4678747.jpg?1699942708",
      "description": "FACE THE FUTURE! Superstar writer Jonathan Hickman (SECRET WARS, AVENGERS, FANTASTIC FOUR) takes the reins of the X-Men universe! Since the release of Uncanny X-Men #1, there have been four seminal moments in the history...",
      "price": "$5.99",
      "rating": null,
      "pulls": null,
      "potw": null
    },
    {
      "name": "Powers of X #1",
      "publisher": "Marvel Comics",
      "url": "https://leagueofcomicgeeks.com/comic/4517621/powers-of-x-1",
      "cover": "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4517621.jpg?1701563454",
      "description": "FEAR THE FUTURE! Superstar writer Jonathan Hickman (INFINITY, NEW AVENGERS, FF) continues his revolutionary new direction for the X-Men. Intertwining with HOUSE OF X, POWERS OF X reveals the secret past, present and future...",
      "price": "$5.99",
      "rating": null,
      "pulls": null,
      "potw": null
    }
  ]
}
```

Fantastic! For the sake of getting this out the door and published, I decided to modify my loop and grid to display each series in my collection with the publisher, title and a link to the collection on League of Comic Geeks so you can view each of the issues I've collected in that series:

{% raw %}
```jinja2
<div class="grid">
  {% for comic in comics.series %}
    <div class="comics">
      <img src="{{ comic.cover }}" alt="Cover Image for {{ comic.name }} load="lazy">
      <p class="comics-publisher">{{ comic.publisher }}</p>
      <p class="comics-title">{{ comic.name }}</p>
      <p class="comics-collection"><a href="{{ comic.url }}">View issues</a></p>
    </div>
  {% endfor %}
</div>
```
{% endraw %}

You can check out the end result on the [Comics](/comics/) page and the [enitre function](https://github.com/flamedfury/flamedfury.com/blob/97ef56f8fe29c83a885b4a74afb57d09e02bc46a/src/_data/comics.js). 

I want to learn how to utilise Eleventy's pagination feature to create a separate page for each comic book series and issue. The series page should display a grid of covers with links to the respective issue pages. On the issue page, I would like to display the cover and details of the issue. Additionally, I plan to optimise the images using eleventy-image.

I want to sort the series and issues by publication date, but the Node module returns no date data. I've raised an issue on the modules repo, so we'll see what happens there. 

Well, I better finish adding the rest of my collection to the catalogue. 