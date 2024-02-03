const { list } = require("pm2");
const { getMarket } = require("../fetch")

exports.bandicamp = async function bandicamp(client, message) {
const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
const banditsCamp = await getMarket()
const listaProdutos = [];
let divisor= '- - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
banditsCamp.forEach((produto) => {
  const infoProduto = `
${divisor}

Item: ${produto.nome}
ID: ${produto.id}
Descrição: ${produto.descricao}
Valor: ${produto.custo}

${divisor}
  `;
  listaProdutos.push(infoProduto);
});

client.sendText(from,listaProdutos,id)
}