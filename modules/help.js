exports.help = async function help(client, message) {
    const { id, from, chat, caption, body } = message;
    const groupId = chat.groupMetadata.id;
    const commands = caption || body || "";
    const args = commands.split(" ");
}