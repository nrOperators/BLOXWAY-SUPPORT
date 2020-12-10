const ms = require("ms");
const moment = require('moment');
var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

exports.run = async (client, message, args) => {
    var e5 = new Discord.RichEmbed()
    .setTitle(":grey_exclamation: Bot Developers Only")
    .setColor("PURPLE")
    .setDescription("For security reasons only Bloxway bot developers can use that command.")
    if(!message.member.roles.findAll('id', '786706380064948246')) return message.channel.send(e5)
      var code = args[1];
    var userid90 = args[0];
    var reasons = args[2];

    var e = new Discord.RichEmbed()
  .setTitle(":white_check_mark: Unblacklist was Successful!")
    .setColor("GREEN")
    .setDescription("I have successfully unblacklisted the user ID: " + userid90 + ". They can now use Bloxway Support again.")
    
   var e5 = new Discord.RichEmbed()
    .setTitle("Unblacklist Error.")
    .setColor("RED")
    .setDescription(":x: Please tell me the user ID to unblacklist so they can use this bot again.")
   
   var e8 = new Discord.RichEmbed()
    .setTitle("Unblacklist Error.")
    .setColor("RED")
    .setDescription(":x: That user is not blacklisted.")
      
 
    if(!userid90) return message.channel.send(e5)
  if(await client.blacklist.get(userid90) == null) return message.channel.send(e8)
 client.blacklist.delete(userid90)


    return message.channel.send(e)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['unblack']
};

exports.help = {
  name: 'unblacklist',
  description: 'LOL',
  usage: 'unblacklist <USER>'
};
