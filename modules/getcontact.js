const fs = require('fs');
const path = require("path");
exports.getcontact = async function getcontact(client, message) {
    const { id, from } = message;
    const chats = await client.getAllChatsWithMessages(false);
    let contatos = chats.filter(chat => chat.id.endsWith('@c.us'));
    let grupos = chats.filter(chat => chat.id.endsWith('@g.us'));
    await client.reply(from, 'Iniciando a exportação dos dados para um arquivo CSV.', id);
    let ids = grupos.map(grupo => grupo.id);
    let contatosIds = contatos.map(contato => contato.id);
    const notContacts = await Promise.all(ids.map(async grupo => {
        const groupMem = await client.getGroupMembers(grupo);
        return groupMem.filter(membro => !contatosIds.includes(membro.id));
    }));
    contatos = contatos.concat(notContacts.flat());
   
    const contatoids = contatos.map(contato => contato.id.replace('@c.us',''));
    const numerosString = contatoids.join(',')
    contatosfilt= JSON.stringify(numerosString).replace(/[\[\]']+/g,'').replace(/,/g, ',\n')
    fs.writeFileSync('contatos.csv', "telefone\n");
    fs.appendFile('contatos.csv', contatosfilt, (err) => {
        if (err) throw err;
        console.log('Arquivo salvo com sucesso!');
      });
   await client.reply(from, 'Resultado escrito em contatos.csv', id);

}