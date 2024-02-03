exports.reportar = async function reportar(client, message) {
    const { id, from, chat,caption,body ,sender} = message;
    const { formattedTitle } = chat;
    const commands = caption || body || "";
    const args = commands.split(" ");
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me informe qual o problema que voce teve no bot', id);
    let string = commands.split(' ').slice(1).join(' ');

    const ownerNumber = "5527988999019@c.us";
    client.sendText(ownerNumber, `UM bug foi reportado, atenção ao bot requerida\n*Numero*:${sender.id} \n*GRUPO*: ${formattedTitle}\n *MENSAGEM:* ${string}`); 
    await client.reply(from, `Mensagem enviada ao gui, ele logo logo vai ver o que houve`, id);

}
    

    
   
