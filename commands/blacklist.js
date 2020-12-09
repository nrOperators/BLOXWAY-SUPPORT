const ms = require("ms");
const moment = require('moment');

exports.run = async (Discord, client, message, args) => {
    var e5 = new Discord.RichEmbed()
    .setTitle(":grey_exclamation: Bot Developers Only")
    .setColor("PURPLE")
    .setDescription("For security reasons only Bloxway bot developers can use that command.")
    if(message.author.id != ('427591816314093568') && message.author.id != ('412093411794092042')) return message.channel.send(e5)

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
      
 //  if(client.cooldowntransfer.has(message.author.id)) {
  //      return message.channel.send(e3)
 //   }
    if(!userid90) return message.channel.send(":x: Please tell me the user ID to blacklist from using this bot.")
      if(userid90 == "427591816314093568") return message.channel.send(e4)
      if(userid90 == "427591816314093568") return message.channel.send(e4)

 client.blacklist.set(userid90, "Blacklisted by: " + message.author.username)


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
