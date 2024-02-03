const { roll_dice } = require("../fetch");

exports.roll = async function roll(client, message) {
    const { id, from, body, caption } = message;
    const commands = caption || body || "";
    const matches = commands.match(/\d+/g);
    
    if (matches === null || matches.length < 2) {
      client.reply(from, "Desculpa, mas você não forneceu a quantidade e o número de lados dos dados", id);
    } else if (matches[0] > 100) {
      client.reply(from, "MIIZERICORDIA BICHO, ta querendo me bugar ? vamos maneirar um pouco ai", id);
    } else if (matches[0] < 1) {
      client.reply(from, "Desculpa, mas você não disse quantos dados são", id);
    } else {
      const args = commands.split(" ");
      let string = commands.split(' ').slice(1).join(' ');
      
    await client.reply(from,`${results}`,id)
    }
}