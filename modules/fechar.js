exports.fechar = async function fechar(client, message) {
    const { id, from, sender, isGroupMsg, chat, body, caption, isMedia, mimetype, quotedMsg, mentionedJidList } = message;
    const groupId = chat.groupMetadata.id;
    onlyAdmins = client.getGroupAdmins(groupId);
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    const botNumber = await client.getHostNumber();
    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;
       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }

    if (!isBotGroupAdmins) return client.reply(from, "Preciso ser administrador do grupo para que isso funcione.", id);
    await client.setGroupToAdminsOnly(chat.id,onlyAdmins)
    client.reply (from,"grupo fechado com sucesso",id )
}