const isClient_message = `Você não é um VIP para buscar anime por frame , faça o seu cadastro .
Entre em contato diretamente com o gui para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor 
e aumentar a quantidade de comandos e evitar que eu fique offline por problemas no pc do gui`;
const path = require("path");
const fs = require("fs"); 
const { decryptMedia } = require("@open-wa/wa-decrypt");
const { getVip, upImage, checkVipExpired } = require("../fetch");
require("dotenv").config();
exports.animebusca = async function animebusca(client, message) {
  const { id, from, body, sender, caption, isMedia, type, chat,quotedMsg } = message;
  if (!isMedia) {
    await client.react(id, "🤷🏻‍♂️");
    client.reply(
      from,
      "Eu necessito receber uma imagem para poder realizar a busca",
      id
    );
    return;
  }
  if (type === !"image") {
    await client.react(id, "🤷🏻‍♂️");
    client.reply(
      from,
      "Eu no momento só consigo buscar se for imagem, não consigo buscar com vídeo ou link",
      id
    );
    return;
  }
  const allVips = await getVip();
  if (allVips.error)
    return client.reply(
      from,
      `Não consegui recuperar os Vip's!\n${allVips.message.text}`,
      id
    );
  const _checkvipexpiraton = checkVipExpired(sender.id);
  if (_checkvipexpiraton === true) {
    console.log("VIP VENCIDO");
    const messagem =
      "⚠️⚠️ Atenção! O seu  vip está vencido , entre em contato com o gui para atualizar \nwa.me/5527988999019";
    await client.sendText(from, messagem, id);
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
  let resultado = await upImage(dist);
  if (resultado.error) {
    if (resultado.error== "Search queue is full"){
      return client.reply(
        from,
        `Eiita parace que a fila está cheia, esperá só um pouco para pedir novamente, parece que tem muita gente usando o comando ao mesmo tempo`,
        id
      ); 
    }
    return client.reply(
      from,
      `Não consegui identificar a imagem que você está pedindo !\n${resultado.error}`,
      id
    );
  }
  for (let i = 0; i < 2; i++) {
    const anime = resultado.result[i];
    animenome = anime.filename;
    animesimilarity = anime.similarity * 100;
    animepisode = anime.episode;
    animeimage = anime.image;
    const resposta = `*Nome:*  ${animenome}

*Similaridade:* ${animesimilarity}%

*Episódio:* ${animepisode}
    `;

    await client.sendFileFromUrl(from, animeimage, "anime.jpg", resposta, id);
    try {
     await fs.unlinkSync(dist);
      console.log("File removed:", dist);
  } catch (err) {
      console.error("error in unlink", err);
  }
  }
};
