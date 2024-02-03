const { dia_Hoje, getRegistred } = require("../fetch");
exports.loja = async function loja(client, message) {
  const { id, from, sender, isGroupMsg, chat, caption, body } = message;
  const commands = caption || body || "";
  let result;
  let isSenderInList = false
  let osintegra= []
  const registreds = await getRegistred();
  const isregistered = await registreds.find((group) => group.id === chat.id);
  if (isregistered) {
    result = isregistered.integrantes;
    const string = JSON.stringify(result)
    const resultante = JSON.parse(string);
    const numeros = resultante.flat().map(obj => obj.numero);
    for (const integrante of numeros){
    const edited = [{numero:integrante}]
    osintegra.push(edited)
}
    const stringed= JSON.stringify(osintegra)
    const parsied = JSON.parse(stringed)
    for (const item of parsied.flat()) {
      if (item.numero === sender.id) {
        isSenderInList = true;
        break;
      }
    }
  }
  if (isSenderInList) {
    console.log(`O valor ${sender.id} está presente na lista.`);
  } else {
    console.log(`O valor ${sender.id} NÃO está presente na lista.`);
  }

  const args = commands.split(" ");
  await client.reply(from, "result", id);
};
