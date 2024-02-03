const { downloadInstagramReel, downloadAndSaveFile } = require("../fetch");

exports.reel = async function reel(client, message) {
    const { id, from, body, caption } = message;

    const commands = caption || body || "";
    const args = commands.split(" ");
    islink=  isURL(args)
    if (args.length === 1) return client.reply(from, 'iiih parece que voce esqueceu de colocar o link do instagram .tenta denovo ', id);
    else if(!islink){
        client.reply(from, 'Eu só consigo buscar se voce me enviar um link do instagram para que eu possa baixar ', id);
        return
    }
    const instalink = args[1];
    const videoId = instalink.split('/').slice(-1)[0];
    const urlstring= `${instalink}`
    const result= await downloadInstagramReel(urlstring)
    console.log(`isto ser result.download ${result[1]}`)
    const final = await downloadAndSaveFile(result,videoId)
    console.log(final)
    const filePath = (__dirname, `../output/${videoId}.mp4`);

    
await client.sendFile(from,filePath,id)
}
async  function isURL(message) {
    // Expressão regular para verificar se a mensagem contém uma URL
    const urlRegex = /(https?:\/\/[^\s]+instagram\.com[^\s]*)/gi;
  
    // Testa se a mensagem contém a URL
    return urlRegex.test(message);
  }