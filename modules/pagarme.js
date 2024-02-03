exports.pagarme = async function pagarme(client, message) {
  const { id, from, isGroupMsg, caption, body,sender } = message;
  const commands = caption || body || "";
  const amount = 50.0; // Valor da transação em reais
  const currency = 'BRL'; // Moeda do pagamento
  const description = 'Pagamento do pedido #12345'; // Descrição do pagamento
  const ownerNumber = '5527988999019@c.us';
  if (isGroupMsg) {
   await client.react(id, "🤷🏻‍♂️");
    client.reply(from, "Este comando não pode ser usado em grupos.", id);
    return
}
if (sender.id !== ownerNumber) {
 await client.react(id, "🤷🏻‍♂️");
 client.reply(from, 'Apenas o dono do bot pode executar este comando', id);
 return 
}   
await client.reply(from,"enviando para voce mesmo um payment request e verei como isso funciona",id)

try {
await client.sendPaymentRequest(sender.id, amount, currency, description)
}
catch (error){
  console.log(error)
}
}