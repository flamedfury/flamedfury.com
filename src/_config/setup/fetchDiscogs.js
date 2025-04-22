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
  await new Promise(resolve => setTimeout(resolve, 2000 * attempt));

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
    return result;
  } catch (error) {
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

    return {
      ...entry,
      discogsData: {
        year: release.year,
        genres: release.genres || [],
        styles: release.styles || [],
        labels: release.labels?.map(l => l.name) || [],
        tracklist: release.tracklist?.map(t => ({
          position: t.position,
          title: t.title,
          duration: t.duration
        })) || [],
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

  } catch (error) {
    console.error('\n🚨 Critical Error:', error.message);
    process.exit(1);
  }
}

// 4. Execute
main();