var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, message, args) => {// eslint-disable-line no-unused-vars
   var e5 = new Discord.RichEmbed()
    .setTitle(":grey_exclamation: Bot Developers Only")
    .setColor("PURPLE")
    .setDescription("For security reasons only Bloxway bot developers can use that command.")
    if(message.author.id != ('427591816314093568') && message.author.id != ('0') && message.author.id != ('0')) return message.channel.send(e5)
      const hastebin = require('hastebin-gen');
      const evalEmbed = new Discord.RichEmbed();
      const code = args.join(' ');
      String.prototype.replaceAll = function (search, replacement) {
        return this.replace(RegExp(search, 'gi'), replacement);
      
    };
      client.clean = text => {
        if (typeof text !== 'string') {
            text = require('util')
                .inspect(text, { depth: 0 });
        }
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replaceAll(client.token, 'WOW, YOU ACTUALLY TRIED TO GET MY TOKEN UR EVIL')
        return text;
    };
      try {
          const evaled = client.clean(eval(code));
          evalEmbed.addField('**Input:**', `\`\`\`\n${code}\n\`\`\``);
          evalEmbed.setColor('BLUE');
          if (evaled.length < 800) {
              evalEmbed.addField('***Output:***', `\`\`\`xl\n${evaled}\n\`\`\``);
          } else {
         await hastebin(evaled, "js").then(r => {
              evalEmbed.addField('****Output:***', `\`\`\`xl\n${r}\n\`\`\``)
          });
          }
          message.channel.send(evalEmbed);
      } catch (err) {
          evalEmbed.setColor('BLUE');
          evalEmbed.addField('ERROR', `\`\`\`xl\n${err}\n\`\`\``);
          message.channel.send(evalEmbed);
      }
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['evaluation']
};

exports.help = {
  name: 'eval',
  description: 'Eval a code',
  usage: 'eval'
};
