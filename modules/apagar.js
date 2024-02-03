exports.apagar = async function apagar(client, message) {
    const { id, from, sender, isGroupMsg, chat, body, caption, isMedia, mimetype, quotedMsg, quotedMsgObj } = message;


    if (!quotedMsg) return client.reply(from, 'voce esqueceu da mensagem, Mencione uma mensagem minha', id);

    const commands = caption || body || "";
    const args = commands.split(" ");

    const botNumber = await client.getHostNumber();
    const groupId = isGroupMsg ? chat.groupMetadata.id : '';
    const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : '';
    const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false;
    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;

    if (isGroupMsg && !isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }
    if (!isBotGroupAdmins){
        return client.reply(from,"Preciso ser administrador para fazer isso")
    }


    await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false);
    await client.reply(from, `Pronto! apaguei a mensagem.`, id);

}
