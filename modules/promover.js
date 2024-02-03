exports.promover = async function promover(client, message) {
    const { id, from, sender, isGroupMsg, chat, body, caption, isMedia, mimetype, quotedMsg, mentionedJidList } = message;

       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const { name, formattedTitle } = chat;
    const commands = caption || body || "";
    const args = commands.split(" ");

    if (args.length === 1) return client.reply(from, 'poxa eu ainda não sei quem voce quer promover... preciso saber quem é', id);

    const ownerNumber = '5527988999019@c.us';
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const groupAdminss = ownerNumber + groupAdmins
    const botNumber = await client.getHostNumber();
    const isGroupAdmins = groupAdminss.includes(sender.id);

    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }

    if (!isBotGroupAdmins) return client.reply(from, "Preciso ser administrador do grupo para que isso funcione.", id);

    if (mentionedJidList.length === 0) return client.reply(from, 'Você precisa mencionar alguém para que isso dê certo', id);
    if (mentionedJidList.length >= 2) return client.reply(from, 'Mencione 1 usuário por vez.', id);
    if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'O usuário já é um administrador.', id);
    await client.promoteParticipant(groupId, mentionedJidList[0]);
    await client.sendTextWithMentions(from, `Pronto! @${mentionedJidList[0]} agora é um admin.`);
}