const fs = require('fs');
const path = require('path');
const https = require('https');

// ------------------------------------------------------------------
// Configuration (read from environment variables)
const GH_TOKEN = process.env.GH_TOKEN;                
const USER = process.env.GITHUB_USER;                 
const HTML_PATH = path.join(__dirname, '..', 'blog_research.html');
// ------------------------------------------------------------------

/**
 * Perform a GET request against the GitHub API.
 */
function ghRequest(apiPath) {
  const opts = {
    hostname: 'api.github.com',
    path: apiPath,
    method: 'GET',
    headers: {
      'User-Agent': 'Lumo-Blog-Updater',
      Accept: 'application/vnd.github.v3+json',
    },
  };
  if (GH_TOKEN) {
    opts.headers.Authorization = `token ${GH_TOKEN}`;
  }

  return new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(
            new Error(`GitHub API ${res.statusCode}: ${data}`)
          );
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

/**
 * Retrieve *all* repos for the user/org (handles pagination).
 */
async function fetchAllRepos() {
  const perPage = 100;
  let page = 1;
  const all = [];

  while (true) {
    const url = `/users/${USER}/repos?per_page=${perPage}&page=${page}&sort=created`;
    const batch = await ghRequest(url);
    all.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }
  return all;
}

/**
 * Escape HTML special characters.
 */
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Render a single repo as the exact markup you posted.
 */
function renderCard(repo) {
  const created = new Date(repo.created_at);
  const day = created.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[created.getMonth()];
  const year = created.getFullYear();

  // Format: “Date: 16th June 2025”
  const suffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  const dateStr = `Date: ${day}${suffix(day)} ${month} ${year}`;

  return `
<div class="blog-post-card">
  <h3 class="blog-post-title">${esc(repo.name)}</h3>
  <p class="blog-post-date">${dateStr}</p>
  <p class="blog-post-description">${esc(
    repo.description || 'No description provided.'
  )}</p>
  <a href="${esc(repo.html_url)}" class="project-link">Read.more()</a>
</div>`.trim();
}

/**
 * Main routine – fetch repos, sort, render, inject.
 */
(async () => {
  try {
    const repos = await fetchAllRepos();

    // Newest first
    repos.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    // Render all cards
    const cardsHtml = repos.map(renderCard).join('\n\n');

    // --------------------------------------------------------------
    // Load the existing HTML file
    const rawHtml = fs.readFileSync(HTML_PATH, 'utf8');

    const startMarker = '<!-- BLOG GRID START -->';
    const endMarker = '<!-- BLOG GRID END -->';

    if (!rawHtml.includes(startMarker) || !rawHtml.includes(endMarker)) {
      throw new Error(
        `Markers not found in ${HTML_PATH}. Please add <!-- BLOG GRID START --> and <!-- BLOG GRID END --> around the <div class="blog-grid"> element.`
      );
    }

    // Split the file into three parts: before, inside, after
    const before = rawHtml.split(startMarker)[0] + startMarker + '\n';
    const after = rawHtml.split(endMarker)[1];
    const newInside = `\n<div class="blog-grid">\n${cardsHtml}\n</div>\n`;

    const newHtml = before + newInside + endMarker + after;

    // Write back (optionally prettify)
    fs.writeFileSync(HTML_PATH, newHtml, 'utf8');
    console.log(
      `✅ Updated ${HTML_PATH} with ${repos.length} repo cards.`
    );
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();