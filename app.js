const Mastodon = require('mastodon-api');
const cron = require('node-cron');

// Replace with your access token and Mastodon instance URL
const ACCESS_TOKEN = 'SrQRozNE5_aY0dbpcVy7tSaNNvjP6xxU1DUN6GXMpXg';
const MASTODON_INSTANCE = 'https://botsin.space';

const client = new Mastodon({
  access_token: ACCESS_TOKEN,
  timeout_ms: 60 * 1000,
  api_url: `${MASTODON_INSTANCE}/api/v1/`,
});

cron.schedule('0 18 1-7 * 3', () => {

  // Replace with your toot message
  const toot = '@frank@indieweb.social This is a scheduled toot';
  const visibility = 'direct';
  
  client.post('statuses', { status: toot, visibility: visibility })
    .then(result => {
      console.log(`Tooted: ${toot}`);
    })
    .catch(error => {
      console.error(error);
    });
});