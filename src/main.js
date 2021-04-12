import fs from 'fs';
import YAML from 'yaml';
import TeleBot from 'telebot';

// Load config
console.log('Loading config')
const file = fs.readFileSync('./config.yaml', 'utf8');
const config = YAML.parse(file);
console.log(`Loaded ${safeLength(config.masters)} masters and`,
  `${safeLength(config.receivers)} receivers`)
const bot = new TeleBot(config.token);

// Event handlers
const relay = (msg) => {
  console.log('Received from' + ' @' + msg.from.username, 'with id', msg.from.id);

  if (!config.masters || config.masters.includes(msg.from.id)) {
    console.log('Replying');

    return config.receivers.map(id => bot.sendMessage(id, msg.text)
      .catch((error) => {
        console.log('Error: ', error);
      }));
  }
}

// Start bot
bot.on('text', relay);
bot.start();

function safeLength(arr) {
  if(arr === undefined || arr === null)
    return 0;
  return arr.length;
}
