exports.broadcastall = async function broadcastall(client, message) {
    const { id, from,caption,body ,sender} = message;
    const commands = caption || body || "";
    const args = commands.split(" ");
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me informe o que sera informado', id);
    const string = commands.split(' ').slice(1).join(' ');
    const ownerNumber = "5527988999019@c.us";
    if (sender.id !== ownerNumber) {
      return client.reply(from, 'Apenas o dono do bot pode executar este comando', id);
    }
  let interval = Math.floor(Math.random() * 10 + 5) * 2000;
  let contatos= await client.getAllChats()
  const contatosID = [];
  contatos.forEach(contato => {
    contatosID.push(contato.id);
    });

  // Envia uma mensagem para cada conversa
  for (let i = 0; i < contatosID.length ; i++) {
    setTimeout(async function() {
      console.log(`teste ${i}`)
      const chat = contatosID[i];
    interval = Math.floor(Math.random() * 10 + 5) * 2000;
    const result = await client.sendText(chat,`${string}`);
    }, i * interval);
  }
  await client.reply(from,"Enviei seu comunicado a todos os contatos",id);
}



