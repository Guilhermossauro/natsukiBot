const { checkficha, alterFicha } = require("../fetch");
exports.alterarficha = async function alterarficha(client, message) {
    const { id, from, isGroupMsg,chat,caption,body} = message;
    const groupId = chat.groupMetadata.id;
    const commands = caption || body || "";
    const args = commands.split(" ");
    const frase = args.slice(1)
    const _ficha = frase.join(` `)



       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
     const _fichas = await checkficha()
    if (_fichas.error) return client.reply(from, `Não consegui recuperar as fichas!`, id);
    const hasficha = _fichas.find(fichas => fichas.id === groupId);
    if (!hasficha){
        client.sendText (from, `🚫 Erro ao retornar a ficha, o grupo não possui uma ficha cadastrada !\n Solicite um administrador usar o comando !cadastroficha`);
    }
    else{ 
    const _alterarficha = await alterFicha(chat.id,_ficha);
        if(_alterarficha.status === "success" ) {
            await client.sendText(from, "✅ Ficha alterada!\nExperimente o comando !ficha para ver a ficha."); 
        } 
        else {
        await client.sendText(from, `🚫 Erro ao verificar a ficha!\n${_alterFicha.message}`);
        }   
    }
}