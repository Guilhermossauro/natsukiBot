exports.clear = async function clear(client, message) {
    const { id, from, sender, body, caption } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");
    const ownerNumber = '5527988999019@c.us';
    if (sender.id !== ownerNumber) {
      await client.react(id, "🤷🏻‍♂️");
      client.reply(from, 'Apenas o dono do bot pode executar este comando', id);
      return 
    }   
    console.log('seeeenha1')
    const clearchats= await client.clearAllChats()
    console.log(clearchats)
    console.log('seeeenha')
    const chats= await client.getAllChats(false)
    const chatsId = [];
    chats.forEach(contato => {
      chatsId.push(contato.id);
    });
    await client.reply(from,`Todos os ${chatsId.length} chats foram limpos`,id)
}
