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
    .setDescription("For security reasons only Bloxway Support HRs can use that command.")
    if(!message.member.roles.findAll('id', '786706380064948246')) return message.channel.send(e5)

    var userid90 = args[0];
    var reasons = args.splice(1).join(" ");

    var e = new Discord.RichEmbed()
  .setTitle(":white_check_mark: Blacklist was Successful!")
    .setColor("GREEN")
    .setDescription("I have successfully blacklisted the user ID: " + userid90 + ". From all aspects of Bloxway Support.")
    
  
       var e4 = new Discord.RichEmbed()
    .setTitle(":x: Blacklist Error.")
    .setColor("RED")
    .setDescription("For security reasons you cannot blacklist that user from using Bloxway Support")
        var e5 = new Discord.RichEmbed()
    .setTitle("Blacklist Error.")
    .setColor("RED")
    .setDescription(":x: Please state the discord ID when you execute the command.")
        var e8 = new Discord.RichEmbed()
    .setTitle("Blacklist Error.")
    .setColor("RED")
    .setDescription(":x: That user is already blacklisted.")
        var e6 = new Discord.RichEmbed()
    .setTitle("Blacklist Error.")
    .setColor("RED")
    .setDescription(":x: Please state the reason for this blacklist.")
      
 //  if(client.cooldowntransfer.has(message.author.id)) {
  //      return message.channel.send(e3)
 //   }
    if(!userid90) return message.channel.send(e5)
      if(userid90 == "427591816314093568") return message.channel.send(e4)
      if(userid90 == "427591816314093568") return message.channel.send(e4)
  if(!reasons) return message.channel.send(e6)

  //  client.groupid2.set(`${code}`,  groupid2);
  if(await client.blacklist.get(userid90) !== null) return message.channel.send(e8)
 await client.blacklist.set(userid90, "Blacklisted by: " + message.author.username + " for a reason of: " + reasons)


    return message.channel.send(e)
}




exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['blacklisted']
};

exports.help = {
  name: 'blacklist',
  description: 'Replys to a ticket',
  usage: 'blacklist <USER>'
};
