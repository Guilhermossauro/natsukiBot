exports.meunumero = async function meunumero(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;

    let chatNumber = sender.id.replace(/@c.us/g, '').split('-');
    let ddd = chatNumber[0].substring(2, 4);
    let number = chatNumber[0].substring(4, 13);

    client.reply(from, `Seu numero é: *${number}* 
E seu ddd é: *${ddd}*`, id);
}