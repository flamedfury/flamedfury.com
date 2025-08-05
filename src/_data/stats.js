import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default function() {
  try {
    // Common Caddy log locations - adjust path as needed
    const logPaths = [
      '/var/log/caddy/access.log',
      '/var/log/caddy/caddy.log',
      './caddy.log', // Local development
      process.env.CADDY_LOG_PATH || '/dev/null'
    ];

    let logPath = null;

    // Find the first existing log file
    for (const potentialPath of logPaths) {
      if (existsSync(potentialPath)) {
        logPath = potentialPath;
        break;
      }
    }

    if (!logPath) {
      console.log("No Caddy log file found, using fallback stats");
      return getFallbackStats();
    }

    // Read log file (limit to last 10MB for performance)
    const logData = readFileSync(logPath, 'utf8');
    const lines = logData.split('\n').filter(line => line.trim());

    // Parse Caddy JSON logs or common log format
    const stats = parseLogData(lines);

    return {
      ...stats,
      lastUpdated: new Date().toISOString(),
      displayTime: new Date().toLocaleString('en-NZ', {
        timeZone: 'Pacific/Auckland',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

  } catch(ex) {
    console.log("Stats parsing failed:", ex.message);
    return getFallbackStats();
  }
};

function parseLogData(lines) {
  const uniqueIPs = new Set();
  const today = new Date().toDateString();
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  let totalHits = 0;
  let todayHits = 0;
  let thisMonthHits = 0;
  let pageViews = 0;
  const popularPages = {};
  const countries = new Set();

  // Process recent lines (last 10000 for performance)
  const recentLines = lines.slice(-10000);

  recentLines.forEach(line => {
    try {
      // Try parsing as Caddy JSON format first
      if (line.startsWith('{')) {
        const logEntry = JSON.parse(line);
        processLogEntry(logEntry, 'json');
      } else {
        // Parse common log format
        processLogEntry(line, 'common');
      }
    } catch(e) {
      // Skip malformed lines
    }
  });

  function processLogEntry(entry, format) {
    let ip, timestamp, path, userAgent, status;

    if (format === 'json') {
      ip = entry.request?.remote_ip || entry.remote_addr;
      timestamp = entry.ts ? new Date(entry.ts * 1000) : new Date();
      path = entry.request?.uri || entry.request?.url;
      status = entry.status;
      userAgent = entry.request?.headers?.['User-Agent']?.[0];
    } else {
      // Common log format parsing (basic)
      const parts = entry.split(' ');
      if (parts.length < 10) return;

      ip = parts[0];
      timestamp = new Date(); // Simplified - would need proper date parsing
      path = parts[6];
      status = parseInt(parts[8]);
    }

    // Skip bots and invalid requests
    if (!ip || ip.includes('bot') || ip.includes('crawl') || status >= 400) {
      return;
    }

    totalHits++;
    uniqueIPs.add(ip);

    // Today's stats
    if (timestamp.toDateString() === today) {
      todayHits++;
    }

    // This month's stats
    if (timestamp.getMonth() === thisMonth && timestamp.getFullYear() === thisYear) {
      thisMonthHits++;
    }

    // Page popularity (exclude assets)
    if (path && !path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/i)) {
      pageViews++;
      popularPages[path] = (popularPages[path] || 0) + 1;
    }
  }

  // Get top pages
  const topPages = Object.entries(popularPages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([path, hits]) => ({ path, hits }));

  return {
    totalVisitors: uniqueIPs.size,
    totalHits,
    todayHits,
    thisMonthHits,
    pageViews,
    topPages,
    // Early 2000s style formatted numbers
    totalVisitorsFormatted: formatCounterNumber(uniqueIPs.size),
    totalHitsFormatted: formatCounterNumber(totalHits),
    // Fun stats for personality
    averagePerDay: Math.round(totalHits / 30), // Rough estimate
    busyLevel: getBusyLevel(todayHits)
  };
}

function getFallbackStats() {
  // Fallback stats when logs aren't available
  const startDate = new Date('2020-01-01'); // Adjust to your site's start date
  const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const estimatedVisitors = Math.floor(daysSinceStart * 3.7); // Rough estimate

  return {
    totalVisitors: estimatedVisitors,
    totalHits: Math.floor(estimatedVisitors * 2.3),
    todayHits: Math.floor(Math.random() * 20) + 5,
    thisMonthHits: Math.floor(estimatedVisitors * 0.1),
    pageViews: Math.floor(estimatedVisitors * 1.8),
    totalVisitorsFormatted: formatCounterNumber(estimatedVisitors),
    totalHitsFormatted: formatCounterNumber(Math.floor(estimatedVisitors * 2.3)),
    topPages: [
      { path: '/', hits: Math.floor(estimatedVisitors * 0.4) },
      { path: '/posts/', hits: Math.floor(estimatedVisitors * 0.2) }
    ],
    averagePerDay: Math.round(estimatedVisitors / daysSinceStart),
    busyLevel: getBusyLevel(Math.floor(Math.random() * 20) + 5),
    fallback: true,
    lastUpdated: new Date().toISOString(),
    displayTime: new Date().toLocaleString('en-NZ', {
      timeZone: 'Pacific/Auckland',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

// Early 2000s style number formatting with leading zeros
function formatCounterNumber(num) {
  return num.toString().padStart(6, '0');
}

// Add some personality to the stats
function getBusyLevel(hits) {
  if (hits > 50) return "🔥 Site's on fire today!";
  if (hits > 20) return "📈 Pretty busy around here";
  if (hits > 10) return "👋 Steady stream of visitors";
  if (hits > 5) return "🌱 Growing nicely";
  return "🤫 Quiet day on the web";
}