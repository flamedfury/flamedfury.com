const EleventyFetch = require('@11ty/eleventy-fetch');

// Add MasterChef Australia to the denylist
const denylist = ['MasterChef Australia'];

// Helper function to group episodes by show title
function groupEpisodesByShow(episodes) {
  const groupedShows = {};
  episodes.forEach((episode) => {
    const showTitle = episode.show.title;
    if (!denylist.includes(showTitle)) {
      if (!groupedShows[showTitle]) {
        groupedShows[showTitle] = [];
      }
      groupedShows[showTitle].push(episode);
    }
  });
  return groupedShows;
}

module.exports = async function () {
  const TV_KEY = process.env.TRAKT_API_KEY;
  const TMDB_KEY = process.env.TMDB_API_KEY;
  const url = 'https://api.trakt.tv/users/flamed/history/shows?page=1&limit=36';
  const res = await EleventyFetch(url, {
    duration: '1h',
    type: 'json',
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': 2,
        'trakt-api-key': TV_KEY,
      },
    },
  });

  let episodes = [];
  for (const show of res) {
    const tmdbId = show.show.ids.tmdb;
    const tmdbUrl = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${TMDB_KEY}`;
    const tmdbRes = await EleventyFetch(tmdbUrl, {
      duration: '1h',
      type: 'json',
    });
    const posterPath = tmdbRes.poster_path;
    show.posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    episodes.push(show);
  }

  // Group episodes by show title
  const groupedEpisodes = groupEpisodesByShow(episodes);

  // Extract shows from grouped episodes with episode range and sort by most recent episode
  const shows = [];
  for (const showTitle in groupedEpisodes) {
    if (Object.hasOwnProperty.call(groupedEpisodes, showTitle)) {
      const episodes = groupedEpisodes[showTitle];
      // Sort episodes by most recent episode (latest season and episode number)
      episodes.sort((a, b) => {
        if (a.episode.season === b.episode.season) {
          return b.episode.number - a.episode.number;
        }
        return b.episode.season - a.episode.season;
      });

      // Determine the episode range
      const episodeRange = episodes.length > 1 ?
        `S${episodes[episodes.length - 1].episode.season}E${episodes[episodes.length - 1].episode.number} - S${episodes[0].episode.season}E${episodes[0].episode.number}` :
        `S${episodes[0].episode.season}E${episodes[0].episode.number}`;

      const showData = {
        show: episodes[0].show,
        posterUrl: episodes[0].posterUrl,
        episodeRange: episodeRange,
      };

      shows.push(showData);
    }
  }

  // Sort shows by the most recent episode
  shows.sort((a, b) => {
    // Compare the most recent episode for sorting
    if (a.show.first_aired && b.show.first_aired) {
      return new Date(b.show.first_aired) - new Date(a.show.first_aired);
    }
    // If the first aired date is missing, maintain the order
    return 0;
  });

  return shows.slice(0, 8);
};
