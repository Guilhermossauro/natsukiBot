exports.sorteio = async function sorteio(client, message) {
    const { id, from, isGroupMsg, chat, caption, body,sender } = message;
    const groupId = chat.groupMetadata.id;
    const commands = caption || body || "";
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }
    


    const args = commands.split(" ");
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me diga quantas pessoas serão sorteadas', id);
    let string = commands.split(' ').slice(1).join('');
    const array = await client.getGroupMembers(groupId);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        topera = array.slice(0,[`${string}`])
      }
      let hehe = `*=== Sorteio Do Grupo ===*\n `;
      for (let i = 0; i < topera.length; i++){
          hehe += `→ `;
          hehe += `@${topera[i].id.replace(/@c.us/g, '')}\n`;
      }
    resultado= hehe

    await client.sendTextWithMentions(from, resultado);

}