const isClient_message = `Você não é um VIP para alterar o seu cadastro VIP , faça o seu cadastro .
Entre em contato diretamente com o gui para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor 
e aumentar a quantidade de comandos e evitar que eu fique offline por problemas no pc do gui`
const { getVip, searchAnime, checkVipExpired, tiktokdownload} = require("../fetch"); 
require('dotenv').config();
exports.tiktok = async function tiktok(client, message) {
    const { id, from, body, sender, caption } = message;

    const commands = caption || body || "";
    const args = commands.split(" ");
    islink=  isURL(args)
    if(!islink){
        client.reply(from, 'Eu só consigo buscar se voce me enviar um link do tiktok para que eu possa baixar ', id);
        return
    }
    const allVips = await getVip();
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient){
        return client.reply(from,isClient_message, id)
    }
    else if (isClient.vipstatus== false){
      return client.reply(from, isClient_message, id);
  }
    const _checkvipexpiraton= checkVipExpired(sender.id)
    if (_checkvipexpiraton === true){
      console.log("VIP VENCIDO")
      const message = '⚠️⚠️ Atenção! O seu  vip está vencido , entre em contato com o gui para atualizar \nwa.me/5527988999019';
      await client.sendText(from, message,id);
      return;
      }
    if (args.length === 1) return client.reply(from, 'iiih parece que voce esqueceu de colocar o link do tiktok .tenta denovo ', id);
    const tiktoklink = args[1];
    let videoId = tiktoklink.split('/').slice(-1)[0];
    let outputPath = (__dirname, `../output/${videoId}.mp4`);
    const result= await tiktokdownload(tiktoklink)
    .then((outputPath) => {
      console.log(`Vídeo baixado e salvo em ${outputPath}`);
    })
    .catch((err) => {
      console.error(`Erro ao baixar o vídeo: ${err.message}`);
    });
await client.sendFile(from,outputPath,id)
}
async  function isURL(message) {
    // Expressão regular para verificar se a mensagem contém uma URL
    const urlRegex = /(https?:\/\/[^\s]+tiktok\.com[^\s]*)/gi;
  
    // Testa se a mensagem contém a URL
    return urlRegex.test(message);
  }