import "dotenv/config";
import EleventyFetch from "@11ty/eleventy-fetch";
import { promises as fs } from 'fs';
import PQueue from 'p-queue';

const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;
const DISCOGS_USER_AGENT = process.env.USER_AGENT;

const queue = new PQueue({ concurrency: 1 }); // Process one request at a time
const initialDelay = 5000; // Initial delay in milliseconds
const maxRetries = 3;

async function fetchWithRateLimit(url, retryCount = 0) {
  try {
    return await queue.add(async () => {
      console.log(`Fetching ${url} (Attempt ${retryCount + 1})`);
      await delay(initialDelay); // Wait before each request
      const response = await EleventyFetch(url, {
        duration: "0s", //Disable cache
        type: "json",
        fetchOptions: {
          headers: {
            'Authorization': `Discogs token=${DISCOGS_TOKEN}`,
            'User-Agent': DISCOGS_USER_AGENT,
          },
        },
      });
      return response;
    });
  } catch (error) {
    if (error.message.includes("429") && retryCount < maxRetries) {
      const delayTime = initialDelay * Math.pow(2, retryCount); // Exponential backoff
      console.warn(`Rate limit hit for ${url}. Retrying in ${delayTime}ms`);
      await new Promise(resolve => setTimeout(resolve, delayTime));
      return fetchWithRateLimit(url, retryCount + 1); // Recursive retry
    } else {
      console.error(`Failed to fetch ${url} after multiple retries:`, error);
      return null; // Return null on final failure
    }
  }
}

async function fetchReleaseDetails(release) {
  if (!release.release_id) {
    console.error('No Discogs ID provided for release:', release.title);
    return release;
  }

  const releaseUrl = `https://api.discogs.com/releases/${release.release_id}`;

  try {
    const releaseDetails = await fetchWithRateLimit(releaseUrl);

    if (!releaseDetails) {
      console.warn(`Skipping ${release.title} due to API error or rate limit`);
      return { ...release, error: "API error" }; // Mark with error
    }

    const uniqueFormats = new Set();
    return {
      ...release,
      label: releaseDetails.labels[0]?.name.replace(/\s*\(\d+\)\s*$/, '') || '',
      year: releaseDetails.year,
      notes: releaseDetails.notes,
      released: releaseDetails.released,
      genres: releaseDetails.genres || [],
      uri: releaseDetails.uri,
      videos: releaseDetails.videos?.map(video => ({
        url: video.uri,
        title: video.title,
        duration: video.duration
      })) || [],
      formats: (releaseDetails.formats || []).reduce((acc, format) => {
        if (!uniqueFormats.has(format.name)) {
          uniqueFormats.add(format.name);
          acc.push({
            name: format.name,
            descriptions: format.descriptions
          });
        }
        return acc;
      }, []),
      tracklist: (releaseDetails.tracklist || []).map(track => ({
        position: track.position,
        title: track.title,
        duration: track.duration
      }))
    };
  } catch (error) {
    console.error(`Error fetching details for ${release.title}:`, error);
    return { ...release, error: "API error" };
  }
}

export default async function () {
  try {
    const localData = await fs.readFile('src/_data/recordShelf.json', 'utf8');
    const myCollection = JSON.parse(localData);
    const releases = [];
    for (const release of myCollection) {
      const fetchedRelease = await fetchReleaseDetails(release);
      if (fetchedRelease && !fetchedRelease.error) {
        releases.push(fetchedRelease);
      } else {
        console.warn(`Skipping ${release.title} due to API error or rate limit`);
      }
    }
    return { releases };
  } catch (error) {
    console.error('Error processing music collection:', error);
    return { releases: [] };
  }
}