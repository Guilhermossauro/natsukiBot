
const path = require("path");
const fs = require("fs");
const { decryptMedia } = require("@open-wa/wa-decrypt");
const { upImage } = require("../fetch");
exports.rolagem = async function rolagem(client, message) {  
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, type } = message;
    let resultado;
    if (isMedia && type === 'image') {
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
        const mediaData = await decryptMedia(message, uaOverride);
        const dist = await path.resolve(__dirname, `../media/yt/${sender.id}_from${chat.id}.jpg`)
        await fs.writeFileSync(dist, mediaData);
        resultado = await upImage(dist)     
        console.log(resultado)   
    }
    const anime= resultado.result[0]
    animenome= anime.filename
    animesimilarity= anime.similarity * 100 
    animepisode= anime.episode
    animeimage= anime.image
    const resposta= `*Nome:*  ${animenome}
 *Similaridade:* ${animesimilarity}% 
    *Episódio:* ${animepisode}
  `
    client.reply(from,` é isso ai meu amigo funcionou sem erro AMEM`,id)
    await client.sendFileFromUrl(from,animeimage, 'anime.jpg', resposta, id);

}

