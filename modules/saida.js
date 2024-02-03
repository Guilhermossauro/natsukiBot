exports.saida = async function saida(client, message) {
    const { id, from, chat } = message;

    const groupId = await client.getAllGroups(chat);
    const ownerNumber = '5527988999019@c.us';
    const groupstring = JSON.stringify(groupId, null, 2);

    await client.reply(from, ` éeer ${groupstring}\n`, id);
    console.log(` éeer ${groupstring}`)

    await client.sendText(ownerNumber, `lista de grupos \n${groupstring} `);

}
