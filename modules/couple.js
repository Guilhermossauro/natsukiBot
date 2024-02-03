exports.couple = async function couple(client, message) {
    const { id, from, isGroupMsg, chat,sender } = message;
    const groupId = chat.id
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const botNumber = "553191958311@c.us"
    const compatibilidade = parseInt(Math.random() * 99 + 1);
    const mms = ["Casar","Namorar","Ficar"];
    
    let resultante;
    let topera;
    
    if (compatibilidade >= 51) {
        resultante = mms[0]; // Casar
    } else if (compatibilidade >= 31) {
        resultante = mms[1]; // Namorar
    } else {
        resultante = mms[2]; // Ficar
    }
    const mensagemA = mms[parseInt(Math.random() * mms.length)];

    const filter = await client.getGroupMembers(groupId);
    const filtered = filter.filter(member => member.id !== botNumber);
    const array = filtered.filter(member => member.id !== sender.id);

    if (array.length === 0) {
        await client.reply(from, "Não foi possível encontrar um par para você.", id);
        return;
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        topera = array.slice(0,1)
    }

    let hehe = `Usuário: @${sender.id}\n `;
    for (let i = 0; i < topera.length; i++) {
        hehe += `Par: @${topera[i].id.replace(/@c.us/g, '')} \n `;
        hehe +=`Compatibilidade: ${compatibilidade}%\n Vocês podiam ${resultante} `
    }

    resultado= hehe
    await client.sendTextWithMentions(from, resultado);
}