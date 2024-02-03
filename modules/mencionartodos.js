exports.mencionartodos = async function mencionartodos(client, message) {
    const { id, from, sender, isGroupMsg, chat } = message;

       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const groupId = chat.groupMetadata.id;
    const mms = [' ', ' ','Não quer ser mais marcado neste comando ou em outros ? \n seja um membro ShadowGuard e o bot não te marcará em nenhum outro comando, fale com o gui para isso \nwa.me/5527988999019 ' ]
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    const ownernumber = "5527988999019@c.us"
    const groupAdmins = await client.getGroupAdmins(groupId); 
    const isGroupAdmins = groupAdmins.includes(sender.id);

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }

    const groupMem = await client.getGroupMembers(groupId);
    let hehe = '*=== Chamada Geral ===*\n';
    for (let i = 0; i < groupMem.length; i++) {
        if (groupMem[i].id !== ownernumber) {
        hehe += '→';
        hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`;
        }        
    }
    await client.sendTextWithMentions(from, hehe);
    await client.sendText(from,mensagemA)
    
}