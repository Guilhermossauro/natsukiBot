const { estapear } = require("../fetch");

exports.tapa = async function tapa(client, message) {
const { id, from, sender, isGroupMsg, chat, body, caption, mimetype, quotedMsg, mentionedJidList } = message;

if (!isGroupMsg) {
 await client.react(id, "🤷🏻‍♂️");
  client.reply(from, "Este comando só pode ser usado em grupos.", id);
  return
}
const { formattedTitle } = chat;
const ownerNumber = await client.getHostNumber();
const commands = caption || body || "";
const args = commands.split(" ");

const groupId = chat.groupMetadata.id;
const groupAdmins = await client.getGroupAdmins(groupId);
const botNumber = await client.getHostNumber();
const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;

if (quotedMsg) {
 const banUser = quotedMsg.author;
 const banUserName = quotedMsg.sender.pushname;
 let userphoto1;
 let userphoto2;
 if (banUser == sender.id) return client.reply(from, 'Estapeando a si mesmo? Ta loko?!', id);
 if (mentionedJidList.includes(ownerNumber)){
     return client.reply(from, 'Poxa, porque voce quer me estapear ?', id);}
} else {
 if (mentionedJidList.length === 0) return client.reply(from, 'poxa eu ainda não sei quem você vai estapear\nEnvie o comando *!tapa* @tagmember', id);
   
 const estapeados = await estapear('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU')
 console.log(estapeados)
 await client.sendText(from, `Pronto! removido \n${mentionedJidList.map(user => `@${user.replace(/@c.us/g, '')}`).join('\n')}`);

}

}