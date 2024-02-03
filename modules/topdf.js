const path = require("path");
const fs = require("fs"); 
const { decryptMedia } = require("@open-wa/wa-decrypt");
const { getVip, upImage, checkVipExpired } = require("../fetch");
require("dotenv").config();
exports.topdf = async function topdf(client, message) {
    const { id, from, body, sender, caption, isMedia, type, chat,quotedMsg } = message;
  if (!isMedia) {
    await client.react(id, "🤷🏻‍♂️");
    client.reply(
      from,
      "Eu necessito receber uma imagem para poder torna-la em pdf",
      id
    );
    return;
  }
  if (type === !"image") {
    await client.react(id, "🤷🏻‍♂️");
    client.reply(
      from,
      "Se não for uma imagem eu não consigo converter",
      id
    );
    return;
  }
  const uaOverride =
  "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
let mediaData = await decryptMedia(message, uaOverride);
if (quotedMsg && quotedMsg.type == 'image'){
  mediaData = await decryptMedia(quotedMsg, uaOverride);
}
const dist = await path.resolve(
    __dirname,
    `../media/yt/${sender.id}_from${chat.id}.jpg`
  );
  await fs.writeFileSync(dist, mediaData);
  
}