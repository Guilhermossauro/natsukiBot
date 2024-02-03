exports.avisartodos = async function avisartodos(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj } = message;

    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const mms = [' ', ' ','Não quer ser mais marcado neste comando ou em outros ? \n seja um membro ShadowGuard e o bot não te marcará em nenhum outro comando, fale com o gui para isso \nwa.me/5527988999019 ' ]
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];

    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    const ownernumber = "5527988999019@c.us"

    if (!isGroupAdmins) {
        client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
        await client.react(id, "🤷🏻‍♂️");
        return
    }

    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const commands = caption || body || "";
    const args = commands.split(" ");
    let alertToSend;

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

    const groupMem = await client.getGroupMembers(groupId);
    let allUsersMention = '';
    for (let i = 0; i < groupMem.length; i++) {
        if (groupMem[i].id !== ownernumber) {
        
        allUsersMention += `@${groupMem[i].id.replace(/@c.us/g, '')} `;
        }
    }

    const textToSend = `*=== Aviso Geral ===*\n${alertToSend}\n\n${allUsersMention}`;

    await client.sendTextWithMentions(from, textToSend);
    await client.sendText(from,mensagemA)
}