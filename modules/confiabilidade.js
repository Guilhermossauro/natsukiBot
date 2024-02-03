
exports.confiabilidade = async function confiabilidade(client, message) {
    const { id, from, sender, mentionedJidList, isGroupMsg} = message;
       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }

    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    if (mentionedJidList.length === 0){
        await client.react(id, "🤷🏻‍♂️");
        client.reply(from, 'poxa eu ainda não sei quem você quer medir a confiabilidade\nEnvie o comando *!confiabilidade* @tagmember', id);
        return }
    const mencionado= await mentionedJidList.map(user => `@${user.replace(/@c.us/g, '')}`)
    const usuario =mencionado
    await client.react(id, "🤔");

    const confiometro =  parseInt(Math.random() * 100);
    const ar = `Então @${pushname}, na minha opinião :\n *Você pode confiar ${confiometro}% em  ${usuario}*`
    await client.reply(from,ar,id);
    if (confiometro <10){ 
        await client.reply(from,"cuidado com esssa pessoa aí hein quase não da para confiar nela",id);
    }
    if (confiometro <40 && confiometro >10){
        await client.reply(from,"cuidado com esssa pessoa, as vezes ela pode ser meio imprevisivel",id);
    }
    if (confiometro <80 && confiometro >100){
        await client.reply(from,"Eu acho que você pode confiar totalmente nesta pessoa :D",id);
    }

}