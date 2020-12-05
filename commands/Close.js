var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, msg, params) => {

  if(!msg.channel.name.startsWith(`t-`)) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${tokens.generic.messages.noPermissions}`)
    .setDescription(`You can only execute this command in a ticket channel!`)
    .setColor(tokens.generic.colour.error)
    .setTimestamp()
    .setFooter(`${tokens.generic.footer}`, `${tokens.generic.footerURL}`)
    msg.channel.send(embed)
    return;
  }

  let thisUser = msg.channel.name.replace('t-', '')
  let user = client.users.get(thisUser);
  const embed = new Discord.RichEmbed()
    .setAuthor(`Bloxway Support`)
    .setDescription('**TICKET CLOSED!**\n\nThank you for using Bloxway Support system!\n\n\n **To open a other ticket please resend a message here to create a new ticket**\n\n\nMake sure to join our group and communications!\n**Ticket has been closed by** ' + msg.author.tag)
    .setColor(tokens.generic.colour.error)
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001 | Reply to open a new ticket`)
  user.send(embed)
  msg.react('✅')

  msg.channel.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['close']
};

exports.help = {
  name: 'close',
  description: 'Replys to a ticket',
  usage: 'close'
};
