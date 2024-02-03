const search = require("youtube-search");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { getVip,checkVipExpired, checkVipExpiration } = require("../fetch");


exports.yt = async function yt(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
    const mms = [' ',' ', ' ', ' ',' ', ' ', ' ', ' ', ' ','Gostando do bot ? \n Poderia dar uma força ao gui, se quiser se inscrever no canal dele \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww','GEEENTE O GUIIII TA EM LIIIIVE, VEM DAR UMA MORALZINHA PARA ELE NA LIIVE * - *\nhttps://www.twitch.tv/guilhermossauro11', ]
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    const outputPath = path.resolve(__dirname, '../media/yt');
    const allVips = await getVip();
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient = allVips.find(vip => vip.phone === sender.id);
    if (!isClient) return client.reply(from, 'Você não é um VIP, faça o seu cadastro enviando uma mensegem ao gui, ele informara os valores \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT.', id);
    else if (isClient.vipstatus== false){
        return client.reply(from, 'Você não é um VIP, faça o seu cadastro enviando uma mensegem ao gui, ele informara os valores \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT.', id);
    }
    const _checkvipexpiraton= await checkVipExpired(sender.id)
    console.log(_checkvipexpiraton)
    if (_checkvipexpiraton === true){
      console.log("VIP VENCIDO")
      const message = '⚠️⚠️ Atenção! O seu  vip está vencido , entre em contato com o gui para atualizar \nwa.me/5527988999019';
      await client.sendText(from, message,id);
      return;
      }
    try {
        const YD = new YoutubeMp3Downloader({
            ffmpegPath: process.env.ffmpegPath, // Remover o caminho para o binário do FFmpeg daqui
            ffmpegOptions: ['-loglevel', 'quiet', '-hide_banner','-nostdin',' --quiet', true],
            outputPath: outputPath, // Local de saída do arquivo (padrão: o diretório home)
            youtubeVideoQuality: "highestaudio", // Qualidade desejada do vídeo (padrão: highestaudio)
            queueParallelism: 3, // Paralelismo de download (padrão: 1)
            progressTimeout: 10000, // Intervalo em ms para os relatórios de progresso (padrão: 1000)
            allowWebm: false, // Habilitar download de fontes WebM (padrão: false)
          });
        const commands = caption || body || "";
        const args = commands.split(" ");
        if (args.length === 1) return client.reply(from, 'iiih parece que voce esqueceu de colocar o nome ou o link da musica .tenta denovo ', id);



        var opts = {
            maxResults: 1,
            key: process.env.YT_KEY,
        };
        var opts = {
            maxResults: 1,
            key: process.env.YT_KEY,
        };
        const pesq = args.slice(1).join(" ");
        
        search(pesq, opts, async function (err, results) {
          if (err) return console.log(err);
          console.log("results", results);
          const searchResult = results[0];
          if (searchResult === undefined ||searchResult === '')
          client.reply (from, " Parece que você enviou um link com uma musica de fora do youtube, ou o link é de uma playlist \n tente verificar o link que voce enviou",id)
          if (!searchResult.kind === 'youtube#video') return client.reply(from, 'Eu nao consigo baixar, pois o link é de uma playlist, tente buscar a musica individualmente', id);
                  try {
              await YD.download(searchResult.id, `${searchResult.id}.mp3`);
              const thumbnails = searchResult.thumbnails;
                const defaultThumbnail = thumbnails.default.url;
                const message = `Achei esse vídeo, já já te mando.\nTitulo: ${searchResult.title}\nLink: ${searchResult.link}\nCanal: ${searchResult.channelTitle}`
              await client.reply(message.from, `Estou procurando o vídeo\n${mensagemA}`, message.id);
              await client.sendFileFromUrl(from,defaultThumbnail,"autopreview",message,id);
            } catch (err) {
                console.error("error in unlink", err);
            }
            YD.on("finished", async function (err, data) {
                console.log("Finished downloading: " + data);
             
                const dist = path.resolve(__dirname, `../media/yt/${results[0].id}.mp3`)
                await client.sendFile(message.from, dist, message.id);
                console.log("SEND FILE");
                try {
                    fs.unlinkSync(dist);
                    console.log("File removed:", dist);
                } catch (err) {
                    console.error("error in unlink", err);
                }
            });


            YD.on("error", async function (error) {
                console.log(error);
                await client.reply(from, `Não consegui baixar sua música ela ou faz parte de uma playlist, ou tem proteção contra download, escolha outra \n${error}`, id);
            });

    

            YD.on("progress", async function (progress) {
                await client.reply(`Calma ai que eu já baixei ${progress.progress.percentage.toFixed(2)}%\nFaltam apenas ${progress.progress.eta} segundos.`);
            });
        });
    } catch (error) {
        await client.reply(from, `Deu ruiim, mostra isso para o Gui:\n${error}`, id);
}
}


