exports.donodogrupo = async function donodogrupo(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
    if (!isGroupMsg) {
      await client.react(id, "🤷🏻‍♂️");
       client.reply(from, "Este comando só pode ser usado em grupos.", id);
       return
  }
    const Owner_ = chat.groupMetadata.owner;
    await client.sendTextWithMentions(from, `Dono do grupo: @${Owner_}`);
}