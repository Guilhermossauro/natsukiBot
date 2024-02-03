exports.testador = async function testador(client, message) {
    const { id, from, body, sender, isGroupMsg,from_id,chat,} = message;
    const commands=  caption || body || "";
  const contatos = await client.getAllContacts(client);
  let hehe = '*=== todos os contatos ===*\n';
  for (let i = 0; i < contatos.length; i++) {
      hehe += '→';
      hehe += ` ${contatos[i].id.replace(/@c.us/g, '')}\n`;
  }
  const ownerNumber = '5527988999019@c.us';
  if (!ownerNumber) {
      return client.reply(from, "Este comando só pode ser usado pelo gui.", id);
      
  }
await client.reply(from,hehe,id)

}