const fs = require("fs");
const { createblockcommand,getCommandAuthorized } = require("../fetch");
require('dotenv').config();
exports.desautorizarcomando = async function desautorizarcomando(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption } = message;   
       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const commandsa = caption || body || "";
    const args = commandsa.split(" ");
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me informe qual o comando que será desautorizado', id);
    const argumento = args.slice(0)
    const comando = argumento
    const ownerNumber = '5527988999019@c.us';
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const groupAdminss = ownerNumber + groupAdmins
    const isGroupAdmins = groupAdminss.includes(sender.id);
    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id); 
}
let commandsautorized = await getCommandAuthorized()
if (commandsautorized === undefined){
    commandsautorized = null
}
if (comando.includes(commandsautorized)){
    return client.reply(from, "Este comando já está desautorizado", id);  
}
else {
const block = await createblockcommand(chat.id,comando)

if (block.error){ 
     client.reply(from, "Não consegui bloquear este comando, tente novamente mais tarde , caso o problema persistir entre em contato com o gui", id); 
    console.log(block.error)
    return
}
await client.reply(from, "O comando foi desautorizado com sucesso", id);  
}
}