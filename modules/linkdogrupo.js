exports.linkdogrupo = async function linkdogrupo(client, message) {
    const { id, from,isGroupMsg, chat,} = message;
    const { name } = chat;

        if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }

    const botNumber = await client.getHostNumber();
    const groupId = isGroupMsg ? chat.groupMetadata.id : '';
    const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : '';
    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;

    if (!isBotGroupAdmins) return client.reply(from, "Preciso ser administrador do grupo para que isso funcione.", id);

    const inviteLink = await client.getGroupInviteLink(groupId);
    client.sendLinkWithAutoPreview(from, inviteLink, `\nLink do grupo: *${name}*`,id);

}