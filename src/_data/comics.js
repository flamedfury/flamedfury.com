const { CollectionTypes, fetchCollection, fetchUser, SortTypes } = require('comicgeeks');
const { AssetCache } = require('@11ty/eleventy-fetch');

module.exports = async function () {
    // Define a unique cache key for your comic book data
    const cacheKey = "ketylust_comic_collection";

    // Create a new AssetCache instance with your cache key
    let asset = new AssetCache(cacheKey);

    // Check if the cache is fresh within the last day
    if (asset.isCacheValid("1m")) {
        // Return cached data.
        return asset.getCachedValue(); // a promise
    }

    try {
        // Fetch user data
        const user = await fetchUser('ketylust');

        // Fetch the collection by series
        const seriesCollection = await fetchCollection(user.id, CollectionTypes.Series, {
            sort: SortTypes.AlphaAsc
        });

        // Fetch the collection by issue
        const issueCollection = await fetchCollection(user.id, CollectionTypes.Issue, {
            sort: SortTypes.AlphaAsc
        });

        // Separate series and issue data
        const data = {
            series: seriesCollection,
            issue: issueCollection
        };

        // Save the fetched collection data into Eleventy's cache
        await asset.save(data, "json");

        // Return the fetched collection data
        return data;
    } catch (error) {
        console.error("Error fetching comic collection:", error);
        return {}; // Return an empty object in case of error
    }
};