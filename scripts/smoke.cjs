const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/recentTransactions',
  'http://localhost:3000/rosters',
  'http://localhost:3000/api/populateRecentTransactions?year=2026',
  'http://localhost:3000/api/populateRosters?year=2026'
];

const http = require('http');
const https = require('https');

function fetch(u) {
  return new Promise((resolve) => {
    const lib = u.startsWith('https') ? https : http;
    lib.get(u, (res) => {
      let b = '';
      res.on('data', (c) => (b += c));
      res.on('end', () => resolve({ url: u, status: res.statusCode, length: b.length }));
    }).on('error', (e) => resolve({ url: u, error: e.message }));
  });
}

(async () => {
  for (const u of urls) {
    const r = await fetch(u);
    console.log(JSON.stringify(r));
  }
})();
