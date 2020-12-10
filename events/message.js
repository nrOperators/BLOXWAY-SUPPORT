const ms = require("ms");
const moment = require('moment');
var Discord = require('discord.js');
const tokens = require('../tokens.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

module.exports = async (client, msg) => {
 
  if (msg.author.bot) return;
  

  let guild = client.guilds.get(tokens.guild);

  if (msg.guild === null) {
   if(await client.blacklist.get(msg.author.id) !== null) return msg.channel.send(`You are blacklisted from bloxway support ${await client.blacklist.get(msg.author.id)}`)
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
      if(await client.blacklist.get(msg.author.id) !== null) return msg.channel.send(`You are blacklisted from bloxway support ${await client.blacklist.get(msg.author.id)}`)
      //this is when a new ticket is created
      //PROMPT TYPE HERE
      const embed = new Discord.RichEmbed()
  .setTitle(`Bloxway Support | Ticket Opening`)
  .setDescription(`Please specify what kind of support you need.\n\n\n1: General Support\n2: Game Support\n3: Discord Support\n4: Ranking Support\n5: Appeal Support\n6: Alliance Support`)//o
  .setColor(`#00b300`)
  
  const mes = await msg.channel.send(embed)
    await mes.react('1️⃣')
    await mes.react('2️⃣')
    await mes.react('3️⃣')
    await mes.react('4️⃣')
    await mes.react('5️⃣')
    await mes.react('6️⃣')
  
  const filter = (reaction, user) => user.id === msg.author.id && ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'].includes(reaction.emoji.name);
  
  const react = (await mes.awaitReactions(filter, { max: 1 })).first().emoji.name;
      
   if(react === '1️⃣') {
 
     createTicket('General Support', msg, client)
   } else if (react === '2️⃣') {

      createTicket('Game Support', msg, client)
   }else if (react === '3️⃣') {

      createTicket('Discord Support', msg, client)
   }else if (react === '4️⃣') {
 
      createTicket('Ranking Support', msg, client)
   }else if (react === '5️⃣') {

      createTicket('Appeal Support', msg, client)
   }else if (react === '6️⃣') {

      createTicket('Alliance Support', msg, client)
   }
      
      
      
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


const createTicket = async function (type, msg, client) {
  let guild = client.guilds.get('778316360094187540');
  await guild.createChannel(`t-${msg.author.id}`, 'text').then(async c => {
        

        let everyone = guild.id;
        let user = msg.author.id;
    
    c.overwritePermissions('782743879953678346', {
      READ_MESSAGES: false,
      SEND_MESSAGES: false,
    })
     c.setParent(tokens.ticket_category)
      
        msg.react('✅')
        //PUT EMBED HERE
              const embed = new Discord.RichEmbed()
    .setAuthor(`TICKET OPENED`)
    .setDescription(`Greetings ${msg.author.username}, \n\n Your ticket has been sent to Bloxway Support staff! \n\n The support staff will reply to this ticket in a delay of 1-4 hours.\n\n⚠Please note images are not able to be sent through the bot. To send an image, right click the image and click copy link, then paste the link here.⚠\n\n ⚠**Warning:** Abusing the support system will get you blacklisted from Bloxway Support.⚠ \n\n\n *Regards*\n*Bloxway Support Team*`)
    .addField(`Topic`, type)          
    .addField(`Reason`, msg.content)
    .setColor(tokens.generic.colour.default)
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001 | Reply below to answer`)
     msg.author.send(embed)
        const eeembd = new Discord.RichEmbed()
    .setAuthor(`Message recieved from ${msg.author.username}`, msg.author.avatarURL)
    .addField(`Topic`, type) //STOP STOP LMAO its was addfewild not desc im dumb lmao
    .addField(`Reason`, msg.content)
    .setColor('#9932cc')
    .setTimestamp()
    .setFooter(`Bloxway Support System | Made by opxrator#0001`)
      c.send(eeembd)
      })
    
  
}
