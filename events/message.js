const Discord = require(`discord.js`);
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

module.exports = async (client, msg) => {
  if (msg.author.bot) return;

  let guild = client.guilds.get(tokens.guild);

  if (msg.guild === null) {
    if (guild.channels.exists('name', `t-${msg.author.id}`)) {
      let c = guild.channels.find(channel => channel.name === `t-${msg.author.id}`);
      const reply1 = new Discord.RichEmbed()
    .setAuthor(`Message SENT!`)
    .setDescription(`Your message has been sent!`)
    .addField(`Content`, msg.content)
    .setColor(tokens.generic.colour.default)
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001 | Reply below to answer`)
      msg.react('✅')
     msg.author.send(reply1)

      //this is when their ticket is ALREADY opened sir
      
      const eembed = new Discord.RichEmbed()
    .setAuthor(`Message recieved from ${msg.author.username}`, msg.author.avatarURL)
    .setDescription(msg.content)
    .setColor('#9932cc')
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001`)
      c.send(eembed)
    } else {
      //this is when a new ticket is created
      const c = await guild.createChannel(`t-${msg.author.id}`, 'text').then(async c => {
        c.setParent(tokens.ticket_category)

        let everyone = guild.id;
        let user = msg.author.id;
        

        c.overwritePermissions(everyone, {
          READ_MESSAGES: true,
          SEND_MESSAGES: true
        })
     
        

        c.overwritePermissions(user, {
          READ_MESSAGES: true,
          SEND_MESSAGES: true
        })
        msg.react('✅')
        //PUT EMBED HERE
              const embed = new Discord.RichEmbed()
    .setAuthor(`TICKET OPENED`)
    .setDescription(`Greetings ${msg.author.username}, \n\n Your ticket has been sent to Bloxway Support staff! \n\n The support staff will reply to this ticket in a delay of 1-4 hours. \n\n\n *Regards*\n*Bloxway Support Team*`)
    .setColor(tokens.generic.colour.default)
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001 | Reply below to answer`)
     msg.author.send(embed)
        const eeembd = new Discord.RichEmbed()
    .setAuthor(`Message recieved from ${msg.author.username}`, msg.author.avatarURL)
    .setDescription(msg.content)
    .setColor('#9932cc')
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001`)
      c.send(eeembd)
      })
    }
  }

  if (!msg.content.startsWith(tokens.prefix)) return;
  let command = msg.content.toLowerCase().split(' ')[0].slice(tokens.prefix.length);
  let params = msg.content.split(' ').slice(1);
  let cmd;
  client.cmd = cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
      cmd.run(client, msg, params);
    }
  }
