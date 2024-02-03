const { alterFicha, checkficha, createficha } = require("../fetch");
exports.cadastroficha = async function cadastroficha(client, message) {
    const { id, from, sender, isGroupMsg, chat ,caption ,body } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");
    const afrase= `Nome:
    Raça:
    Classe:
    level:
    Xp:

    `

       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
const frase = args.slice(1)
const _ficha = frase.join(` `)
if (_ficha.length <= 0 ) return client.reply(from, `Foi mau, mas assim eu não consigo... me diga qual vai ser a ficha do grupo \n exemplo:\n!cadastroficha ${afrase}`, id);
    const ownerNumber = '5527988999019@c.us';
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const groupAdminss = ownerNumber + groupAdmins
    const isGroupAdmins = groupAdminss.includes(sender.id);

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }
    const _fichas = await checkficha()

    if (_fichas.error) return client.reply(from, `Não consegui recuperar as fichas!`, id);
    const hasficha = _fichas.find(fichas => fichas.id === chat.id);
    if (hasficha){
        return client.sendText (from, `🚫 Erro ao criar a ficha, o grupo já possui uma ficha cadastrada !`);
    }
    if (!hasficha){
    await createficha(chat.id,_ficha);
    if (createficha.error){  
        return client.reply(from, `Não consegui enviar a sua ficha`, id);
}
    else{
        await client.sendText(from, "✅ Ficha Cadastrada!\nExperimente o comando !ficha para ver a ficha.");
     }
    }
    
}

    
