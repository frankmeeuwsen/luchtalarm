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

cron.schedule('0 12 1-7 * 1', () => {
  const texts=[
      'Het is de eerste maandag van de maand! We zijn er weer! Wiiiiieeeeew wiiiiiiieeeeew wiiiiiieeeeeew! Een fijne dag en tot volgende maand!', 
      'Lunchtijd! Oh nee, het zijn mijn alarmbellen die afgaan! Woeiwoeiwoeiwoei', 
      'WOEOEOEOEOEOEOEOEOEOEOEOEOEOEOE! Nu jij weer!',
      'Woeoeoeoeoe woeoeoeoeoeoeoeoeoe woeoeoeoeoeoeoeoe (wat een kabaal he mensen)',
      'Woeoeoe woeoeoeoeoeoeoe woeoeoeoeoeoe.... Ben je je weer rot geschrokken van me?',
      'De eerste maandag van de maand, we mogen weer!!!! Lekker die NLAlert op je telefoon, je schrikt je overal rot....Wiiiiiieeeeewwwww wwwwiiiiieeeeewwwww!',
      'Wwwwoooeeeeeeoeoeoeoeoeooeoe woeoeoeoeoeoe woeooeoeoe.... zo... klaar. Tot volgende maand!',
      'wwwwiiieeeeeee wwwiiiieeeeeeeeeeeeeeee wwwwwiiiiiiiieeeeeeeeeeeeeeeeeeeeeee. Doei.',
      'wwwwwwwwwoooeoeeeeeeeewwwwoooeeeeeeeeewoeeeeeeeeeiiiiiiiii.... reboosten mag hoor lieve mensen!',
      'wwoeoeoeoeoeoeoeoe  woeoeoeoeoe woeoeoeoeoeoeoeoe',
      'Het is weer maandag. Het is de eerste van de maand. Je weet wat dat betekent.... (schraapt keel).....wwwwwwoooooeeeeeee wwwooeeeeeee wooeeeee.... Tot volgende maand!'];
  const randotoot = texts[Math.floor(Math.random() * texts.length)];
  const toot = `${randotoot} \r\n#NLAlert #Luchtalarm`;
  const visibility = 'public';
  
  client.post('statuses', { status: toot, visibility: visibility })
    .then(result => {
      const created_at = result.data.created_at;
      const id = result.data.id;
      const content = result.data.content;
      fs.appendFileSync('log.json', `${created_at}:  ${content} \r\n`);
      console.log(`ID: ${id} at ${created_at}`);
      console.log(`Tooted: ${toot}`);
    })
    .catch(error => {
      console.error(error);
      fs.appendFileSync('error.json', `${created_at}:  ${error} \r\n`);
    });
});
