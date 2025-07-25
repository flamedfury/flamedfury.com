#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Beer Data Delta Update Script
 * Adapted for your project structure
 */

// Adjust paths relative to your project structure
const BEER_DATA_PATH = path.join(__dirname, '../../../src/_data/beers.json');
const DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads');

const REQUIRED_FIELDS = [
  'bid', 'beer_name', 'brewery_name', 'beer_type', 'beer_abv',
  'rating_score', 'created_at', 'venue_name', 'photo_url', 'checkin_comment'
];

function findLatestUntappdExport() {
  try {
    const files = fs.readdirSync(DOWNLOAD_DIR)
      .filter(file => file.includes('untappd') && file.endsWith('.json'))
      .map(file => ({
        name: file,
        path: path.join(DOWNLOAD_DIR, file),
        mtime: fs.statSync(path.join(DOWNLOAD_DIR, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime);

    if (files.length > 0) {
      console.log(`📥 Found latest export: ${files[0].name}`);
      return files[0].path;
    }
  } catch (error) {
    console.log('⚠️  Could not auto-find export file');
  }

  return null;
}

function loadExistingData() {
  try {
    if (fs.existsSync(BEER_DATA_PATH)) {
      const data = JSON.parse(fs.readFileSync(BEER_DATA_PATH, 'utf8'));
      console.log(`📚 Loaded ${data.length} existing check-ins`);
      return data;
    }
  } catch (error) {
    console.error('❌ Error loading existing data:', error.message);
  }

  console.log('📝 Starting with empty dataset');
  return [];
}

function loadNewExport(exportPath) {
  try {
    const data = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    console.log(`📥 Loaded ${data.length} check-ins from export`);
    return data;
  } catch (error) {
    console.error('❌ Error loading export file:', error.message);
    process.exit(1);
  }
}

function cleanBeerData(rawBeer) {
  const cleaned = {};

  REQUIRED_FIELDS.forEach(field => {
    if (rawBeer[field] !== undefined && rawBeer[field] !== null && rawBeer[field] !== '') {
      cleaned[field] = rawBeer[field];
    }
  });

  if (!cleaned.bid || !cleaned.beer_name || !cleaned.brewery_name) {
    return null;
  }

  return cleaned;
}

function performDeltaUpdate(existingData, newExportData) {
  console.log('\n🔄 Starting delta update...');

  const existingCheckins = new Map();

  // Index existing data using multiple possible keys for better deduplication
  existingData.forEach(checkin => {
    // Try multiple key strategies to catch duplicates
    const keys = [
      checkin.checkin_id,
      `${checkin.bid}-${checkin.created_at}`,
      `${checkin.beer_name}-${checkin.brewery_name}-${checkin.created_at}`,
      // Add rating and venue for even more specificity
      `${checkin.bid}-${checkin.created_at}-${checkin.rating_score || 'no-rating'}`
    ].filter(Boolean);

    keys.forEach(key => {
      existingCheckins.set(key, checkin);
    });
  });

  console.log(`📚 Indexed ${existingData.length} existing check-ins with ${existingCheckins.size} keys`);

  let newCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let duplicateCount = 0;

  const processedCheckins = new Map();

  newExportData.forEach(rawCheckin => {
    const cleanedCheckin = cleanBeerData(rawCheckin);
    if (!cleanedCheckin) {
      skippedCount++;
      return;
    }

    // Generate the same keys for comparison
    const keys = [
      cleanedCheckin.checkin_id,
      `${cleanedCheckin.bid}-${cleanedCheckin.created_at}`,
      `${cleanedCheckin.beer_name}-${cleanedCheckin.brewery_name}-${cleanedCheckin.created_at}`,
      `${cleanedCheckin.bid}-${cleanedCheckin.created_at}-${cleanedCheckin.rating_score || 'no-rating'}`
    ].filter(Boolean);

    // Check if this checkin already exists using any of the keys
    const existingKey = keys.find(key => existingCheckins.has(key));

    if (existingKey) {
      // Update existing checkin if needed
      const existing = existingCheckins.get(existingKey);
      let hasChanges = false;

      ['rating_score', 'checkin_comment', 'photo_url', 'venue_name'].forEach(field => {
        if (cleanedCheckin[field] !== existing[field] && cleanedCheckin[field]) {
          existing[field] = cleanedCheckin[field];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        updatedCount++;
        console.log(`🔄 Updated: ${cleanedCheckin.beer_name}`);
      } else {
        duplicateCount++;
      }

      // Make sure it's in our processed map
      processedCheckins.set(existingKey, existing);
    } else {
      // This is genuinely new
      const newKey = keys[0] || `new-${newCount}`;
      processedCheckins.set(newKey, cleanedCheckin);
      newCount++;
      console.log(`🆕 New: ${cleanedCheckin.beer_name} (${cleanedCheckin.created_at})`);
    }
  });

  // Add any existing checkins that weren't in the new export
  existingData.forEach(checkin => {
    const keys = [
      checkin.checkin_id,
      `${checkin.bid}-${checkin.created_at}`,
      `${checkin.beer_name}-${checkin.brewery_name}-${checkin.created_at}`,
      `${checkin.bid}-${checkin.created_at}-${checkin.rating_score || 'no-rating'}`
    ].filter(Boolean);

    const hasKey = keys.some(key => processedCheckins.has(key));
    if (!hasKey) {
      processedCheckins.set(keys[0] || `existing-${checkin.bid}-${checkin.created_at}`, checkin);
    }
  });

  const updatedData = Array.from(processedCheckins.values())
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  console.log('\n📊 Summary:');
  console.log(`   🆕 New: ${newCount}`);
  console.log(`   🔄 Updated: ${updatedCount}`);
  console.log(`   📋 Duplicates found: ${duplicateCount}`);
  console.log(`   ⏭️  Skipped invalid: ${skippedCount}`);
  console.log(`   📈 Total: ${updatedData.length}`);

  return {
    data: updatedData,
    stats: { newCount, updatedCount, duplicateCount, skippedCount, total: updatedData.length }
  };
}

function saveUpdatedData(data, stats) {
  try {
    // Create backup
    if (fs.existsSync(BEER_DATA_PATH)) {
      const backupPath = BEER_DATA_PATH.replace('.json', `-backup-${Date.now()}.json`);
      fs.copyFileSync(BEER_DATA_PATH, backupPath);
      console.log(`💾 Backup: ${path.basename(backupPath)}`);
    }

    // Ensure directory exists
    fs.mkdirSync(path.dirname(BEER_DATA_PATH), { recursive: true });

    fs.writeFileSync(BEER_DATA_PATH, JSON.stringify(data, null, 2));
    console.log(`✅ Saved to ${path.relative(process.cwd(), BEER_DATA_PATH)}`);

    // Generate and save updated summary
    const summary = {
      lastUpdated: new Date().toISOString(),
      totalCheckins: data.length,
      uniqueBeers: new Set(data.map(c => c.bid)).size,
      uniqueBreweries: new Set(data.map(c => c.brewery_name)).size,
      updateStats: stats
    };

    const summaryPath = path.join(path.dirname(BEER_DATA_PATH), 'beer-update-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📋 Summary updated: ${path.relative(process.cwd(), summaryPath)}`);

  } catch (error) {
    console.error('❌ Error saving:', error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🍺 Fetching Beer Updates...\n');

  // Try to find export file automatically or use provided argument
  let exportPath = process.argv[2];

  if (!exportPath) {
    exportPath = findLatestUntappdExport();
    if (!exportPath) {
      console.log('Usage: npm run fetch-beers [path-to-export.json]');
      console.log('Or place untappd export in Downloads folder');
      process.exit(1);
    }
  }

  if (!fs.existsSync(exportPath)) {
    console.error(`❌ File not found: ${exportPath}`);
    process.exit(1);
  }

  const existingData = loadExistingData();
  const newExportData = loadNewExport(exportPath);
  const result = performDeltaUpdate(existingData, newExportData);

  saveUpdatedData(result.data, result.stats);

  console.log('\n🎉 Update complete!');

  if (result.stats.newCount > 0) {
    console.log('🚀 Ready to build and deploy!');
  }
}

main();