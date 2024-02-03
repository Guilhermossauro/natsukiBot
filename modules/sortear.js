exports.sortear = async function sortear(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj } = message;

       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }

    const groupId = chat.groupMetadata.id;
    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }

    const groupMem = await client.getGroupMembers(groupId);
    let allUsersMention = '';
    for (let i = 0; i < groupMem.length; i++) {
        allUsersMention += `@${groupMem[i].id.replace(/@c.us/g, '')} `;
    }

    const sorteador = allUsersMention[parseInt(Math.random() * allUsersMention.length)];
    const sorteado = `@${groupMem[{sorteador}].id.replace(/@c.us/g, '')} `;


    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const commands = caption || body || "";
    const args = commands.split(" ");
    let alertToSend;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    if (quotedMsg) {
        alertToSend = quotedMsgObj.text;
    } else {
        if (args.length !== 1) {
            alertToSend = args.slice(1).join(" ");
        } else if (commands.split('\n').length !== 1) {
            const args = commands.split('\n');
            alertToSend = args.slice(1).join("\n");
        } else {
            return client.reply(from, 'poxa eu ainda não sei a mensagem que voce quer que eu avise... preciso saber a mensagem!', id);
        }
    }
    const textToSend = `*=== SORTEADO ===*\n${alertToSend}\n\n${sorteado}`;

    await client.sendTextWithMentions(from, textToSend);

}