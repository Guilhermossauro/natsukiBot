const path = require("path");
const fs = require("fs");
exports.motivacao = async function motivacao(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;

    const motivacional =  path.resolve(__dirname, `../media/motivacional.mp4`)

    await client.sendFile(message.from, motivacional, message.id);
    console.log('enviado com sucesso')




}