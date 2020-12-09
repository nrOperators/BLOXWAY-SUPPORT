const Discord = require(`discord.js`);
const log = require(`./handlers/logHandler.js`);
const tokens = require(`./tokens.json`);
const fs = require(`fs`);
const EnmapLevel = require('enmap-level');
const Enmap = require('enmap');
const client = new Discord.Client();
const got = require("got")
setInterval(function() {
  got("https://bloxway-support.glitch.me");
}, 230000);

client.db1 = new Enmap({provider: new EnmapLevel({name: "blacklisted"})});
client.blacklist = new Enmap({provider: new EnmapLevel({name: "blacklist"})});
client.userid90 = new Enmap({provider: new EnmapLevel({name: "userid90"})});
client.userid90reason = new Enmap({provider: new EnmapLevel({name: "userid90reason"})});


client.tokens = tokens;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log.info(`Loading Command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
  log.info(`Loading a total of ${files.length} commands.`);
});

fs.readdir('./events/', (err, files) => {
  if (err) console.error(err);
  log.info(`Loading a total of ${files.length} events.`);
  files.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.on('error', console.error);

process.on("unhandledRejection", err => {
  log.error("Unhandled Promise Rejection: " + err.stack);
});


client.login(`${tokens.token}`);
