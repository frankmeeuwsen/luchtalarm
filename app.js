require('dotenv').config();
const Mastodon = require('mastodon-api');
const cron = require('node-cron');
const fs = require('fs');
// Replace with your access token and Mastodon instance URL
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const MASTODON_INSTANCE = 'https://botsin.space';

console.log("Mastodon bot starting...");

const client = new Mastodon({
  access_token: ACCESS_TOKEN,
  timeout_ms: 60 * 1000,
  api_url: `${MASTODON_INSTANCE}/api/v1/`,
});

cron.schedule('44-46 19 1-7 * 3', () => {
  const texts=[
      'Mijn eerste tekst', 
      'mijn tweede tekst', 
      'Mijn derde tekst',
      'Mijn vierde',
      'Mijn vijfed',
      'Nog een tekst',
      'gossie zes',
      'Echt nummer 7',
      '8 baby',
      '9 to go',
      '10 is where it\'s at'];
  const randotoot = texts[Math.floor(Math.random() * texts.length)];
  const toot = `@frank@indieweb.social This is the ${randotoot} toot`;
  const visibility = 'direct';
  
  client.post('statuses', { status: toot, visibility: visibility })
    .then(result => {
      console.log(`Tooted: ${toot}`);
      const created_at = result.data.created_at;
      const id = result.data.id;
      
      console.log(`ID: ${id} at ${created_at}`);
    })
    .catch(error => {
      console.error(error);
    });
});
