exports.pau = async function pau(client, message) {
    const { id, from, sender, isGroupMsg } = message;

    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
        client.reply(from, "Este comando só pode ser usado em grupos.", id);
        return;
    }

    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;

    await client.react(id, "🤔");
    console.log(`testador ${sender.id} testador tambem ${pushname}`);

    const confiometro =  parseInt(Math.random() * 45 + 1);
    const persona = pushname;

    setTimeout(() => {
        client.sendTextWithMentions(from, `Então @${persona} ,\n *O seu pau tem ${confiometro}cm*`, id);
    

    if (confiometro >8 && confiometro <12 ){ 
         client.reply(from, "A sua espada meu guerreiro, foi categorizada como adaga", id);
    }
    if (confiometro >=1 && confiometro <8 ){ 
         client.reply(from, "Sinto lhe informar isso mas, voce possui um canivete de bolso", id);
    }
    if (confiometro >13 && confiometro <19){
         client.reply(from, "Parabens meu amigo, você está na media pelo menos né", id);
    }
    if (confiometro >23 && confiometro <28){
         client.reply(from, "Isso não é uma espada, é uma lança meu guerreiro", id);
    }
    if (confiometro >29 && confiometro <46){
         client.reply(from, "Olá Kid Bengala", id);
    }

}, 20000);
}
