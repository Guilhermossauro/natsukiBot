const fs = require("fs");
const { autorizecommand } = require("../fetch");
require('dotenv').config();
exports.autorizarcomando = async function autorizarcomando(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption } = message;
    const commands = Object.keys(commands).map(function(key) {
        return key;
    });
    
       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const commandsa = caption || body || "";
    const args = commandsa.split(" ");
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me informe qual o comando que será desautorizado', id);
    const comando = args.slice(1)
    const ownerNumber = '5527988999019@c.us';
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const groupAdminss = ownerNumber + groupAdmins
    const isGroupAdmins = groupAdminss.includes(sender.id);
    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }
    if (!comando.includes(commands)){
        return client.reply(from, "Este comando não existe. Veja no menu os comandos disponiveis", id);
    }
    const _checkcommand = getCommandAuthorized(chat.id)
    if (_checkcommand.status === "success"){
       const _createAuthorization= autorizecommand(chat.id,comando)
       if (_createAuthorization.status === "success") {
        await client.sendText(from, "🔒 Comando autorizado!");
    } else {
        await client.sendText(from, `🔒 Erro ao autorizar comando!\n${_alterAuthorization.message.text}`);
    }
} else {
    await client.sendText(from, "🔓 O comando já estava autorizado!\nVocê pode desautorizar o comando com !desautorizarcomando ");
}
if (_checkcommand.status === "error" && _checkcommand.message.code === 404){
    const _createAuthorization= autorizecommand(chat.id,comando)
    if (_createAuthorization.status === "success") {
     await client.sendText(from, "🔒 Comando autorizado!");
 } else {
     await client.sendText(from, `🔒 Erro ao autorizar comando!\n${_alterAuthorization.message.text}`);
 }
} else {
 await client.sendText(from, "🔓 O comando já estava autorizado!\nVocê pode desautorizar o comando com !desautorizarcomando ");    
}
}