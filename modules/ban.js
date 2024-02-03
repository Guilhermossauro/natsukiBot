exports.ban = async function ban(client, message) {
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
    let isGroupAdmins = groupAdmins.includes(sender.id);
    if (sender.id === "5527988999019@c.us"){
        isGroupAdmins= true
    }
    const botNumber = await client.getHostNumber();
    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }

    if (!isBotGroupAdmins) return client.reply(from, "Preciso ser administrador do grupo para que isso funcione.", id);

    if (quotedMsg) {
        const banUser = quotedMsg.author;
        const banUserName = quotedMsg.sender.pushname;
        if (banUser == sender.id) return client.reply(from, 'Banindo a si mesmo? Ta loko?!', id);
        if (banUser == chat.groupMetadata.owner) return client.reply(from, 'Você não pode banir o dono do grupo', id);
        if (banUser.includes(ownerNumber))
        return client.reply(from, 'Sabe algo que não vou fazer? Banir a mim mesmo!', id);
        if (mentionedJidList.includes(ownerNumber)){
            return client.reply(from, 'Sabe algo que não vou fazer? Banir a mim mesmo!', id);}
        await client.sendText(from, `Adeus ${banUserName}`);
        await client.removeParticipant(groupId, banUser);
    } else {
        if (mentionedJidList.length === 0) return client.reply(from, 'poxa eu ainda não sei quem você vai remover\nEnvie o comando *!ban* @tagmember', id);
        if (mentionedJidList.includes(chat.groupMetadata.owner)) return client.reply(from, 'Você não pode banir o dono do grupo', id);
        if (mentionedJidList.includes(ownerNumber))
        return client.reply(from, 'Sabe algo que não vou fazer? Banir a mim mesmo!', id)
        await client.sendText(from, `Pronto! removido \n${mentionedJidList.map(user => `@${user.replace(/@c.us/g, '')}`).join('\n')}`);
        for (let i = 0; i < mentionedJidList.length; i++) {
            if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id);
            console.log('BANIDO ===>', mentionedJidList[i].replace(/@c.us/g, ''));
            await client.removeParticipant(groupId, mentionedJidList[i]);
        }
    }
}