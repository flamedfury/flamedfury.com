import { promises as fs } from 'fs';
import EleventyFetch from '@11ty/eleventy-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Environment Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../../src/_data/musicCollection.json');
const outputPath = path.resolve(__dirname, '../../../src/_data/recordShelf.json');

dotenv.config();

console.log('🔑 Environment Check:');
console.log('- Token (prefix):', process.env.DISCOGS_TOKEN?.slice(0, 5) + '...');
console.log('- User Agent:', process.env.USER_AGENT);

// 2. Core Functions
async function fetchWithRetry(url, attempt = 1) {
  console.log(`\n🔗 Attempt ${attempt} for ${url}`);

  // Exponential backoff: 2s, 4s, 8s
  const delay = 2000 * Math.pow(2, attempt - 1);
  await new Promise(resolve => setTimeout(resolve, delay));

  try {
    const result = await EleventyFetch(url, {
      duration: "30d",
      type: "json",
      fetchOptions: {
        headers: {
          'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`,
          'User-Agent': process.env.USER_AGENT,
        },
      }
    });

    console.log(`✅ Successfully fetched: ${url}`);
    return result;
  } catch (error) {
    if (error.message.includes('429')) {
      console.warn(`⏱️ Rate limited, waiting longer...`);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Extra wait for rate limits
    }

    console.error(`❌ Attempt ${attempt} failed:`, error.message);
    if (attempt < 3) return fetchWithRetry(url, attempt + 1);
    throw error;
  }
}

async function enrichEntry(entry) {
  if (!entry?.release_id) {
    console.warn('⚠️ Invalid entry:', entry);
    return entry;
  }

  try {
    console.log(`🔄 Processing ${entry.artist} - ${entry.title}`);
    const release = await fetchWithRetry(
      `https://api.discogs.com/releases/${entry.release_id}`
    );

    // Fetch master release data for original album info
    let masterData = null;
    if (release.master_id) {
      try {
        console.log(`🎵 Fetching master data for ${entry.title}`);
        masterData = await fetchWithRetry(
          `https://api.discogs.com/masters/${release.master_id}`
        );
      } catch (error) {
        console.warn(`⚠️ Could not fetch master data for ${entry.title}:`, error.message);
      }
    }

    return {
      ...entry,
      discogsData: {
        year: release.year, // Pressing year
        // Original album information
        originalYear: masterData?.year || release.year,
        originalTitle: masterData?.title || release.title,
        // This specific pressing information
        released: release.released || release.released_formatted || null,
        releaseDate: release.date_added || release.released || null,
        pressingYear: release.year,
        // Standard fields
        genres: release.genres || [],
        styles: release.styles || [],
        labels: release.labels?.map(l => l.name) || [],
        tracklist: release.tracklist?.map(t => ({
          position: t.position,
          title: t.title,
          duration: t.duration
        })) || [],
        // Additional useful fields from Discogs
        country: release.country || null,
        format: release.formats?.[0]?.name || null,
        formatDetails: release.formats?.map(f => ({
          name: f.name,
          qty: f.qty,
          descriptions: f.descriptions || []
        })) || [],
        // Master release info
        masterUrl: release.master_url || null,
        masterId: release.master_id || null,
        // Catalog numbers
        catno: release.labels?.[0]?.catno || null,
        // Additional master release data
        masterGenres: masterData?.genres || [],
        masterStyles: masterData?.styles || []
      }
    };
  } catch (error) {
    console.error(`💥 Failed ${entry.title}:`, error.message);
    return entry;
  }
}

// 3. Main Execution Flow
async function main() {
  try {
    // File Validation
    console.log('\n🔍 Verifying musicCollection.json...');
    await fs.access(dataPath);
    const rawData = await fs.readFile(dataPath, 'utf8');
    const collection = JSON.parse(rawData);

    if (!Array.isArray(collection)) {
      throw new Error('❌ Expected array in musicCollection.json');
    }
    console.log(`📊 Found ${collection.length} records`);

    // Processing
    const enriched = [];
    for (const entry of collection) {
      const result = await enrichEntry(entry);
      enriched.push(result);
      console.log(`✅ Processed ${entry.title}`);
    }

    // Output
    await fs.writeFile(outputPath, JSON.stringify(enriched, null, 2));
    console.log(`\n🎉 Saved ${enriched.length} records to recordShelf.json`);

    // Summary stats
    const withDiscogs = enriched.filter(r => r.discogsData).length;
    const withDates = enriched.filter(r => r.discogsData?.released).length;
    const withMasterData = enriched.filter(r => r.discogsData?.masterId).length;
    console.log(`\n📈 Summary:`);
    console.log(`- Records with Discogs data: ${withDiscogs}/${enriched.length}`);
    console.log(`- Records with pressing dates: ${withDates}/${enriched.length}`);
    console.log(`- Records with master release data: ${withMasterData}/${enriched.length}`);

    console.log(`\n⏱️ Note: This process made additional API calls to fetch master release data.`);
    console.log(`   Total API calls: ~${enriched.length * 1.5} (release + master data)`);


  } catch (error) {
    console.error('\n🚨 Critical Error:', error.message);
    process.exit(1);
  }
}

// 4. Execute
main();