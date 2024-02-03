exports.probabilidade = async function probabilidade(client, message) {
    const { id, from, sender, isGroupMsg ,quotedMsg, quotedMsgObj,caption,body} = message;
    let { pushname, verifiedName } = sender;
    let user = sender.id.replace(/@c.us/g, '')
    pushname = pushname || verifiedName;
    const commands = caption || body || "";
    const args = commands.split(" ");

    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
        client.reply(from, "Este comando só pode ser usado em grupos.", id);
        return;
    }
    if (quotedMsg) {
        alertToSend = quotedMsgObj.text;
    } else {
        if (args.length !== 1) {
            alertToSend = args.slice(1).join(" ");
        } else if (commands.split('\n').length !== 1) {
            const args = commands.split('\n');
            alertToSend = args.slice(1).join("\n");
        } else {
            return client.reply(from, 'poxa eu ainda não sei do que voce quer saber a probabilidade... preciso saber o que vai ser :/ \n Exemplo : !probabilidade de eu ser rico', id);
        }
    }
    const confiometro =  parseInt(Math.random() * 100+ 1);
    const mensagem = `Então @${user} a probabilidade ${alertToSend} é de exatos ${confiometro}% `
    return client.sendTextWithMentions(from,mensagem, id);
}