const { checkficha } = require("../fetch");
exports.ficha = async function ficha(client, message) {
    const { id, from, isGroupMsg,chat} = message;
       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const mms = [' ',' ','Gostando do bot ? \n Poderia dar uma força ao gui, se quiser se inscrever no canal dele \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww','GEEENTE O GUIIII TA EM LIIIIVE, VEM DAR UMA MORALZINHA PARA ELE NA LIIVE * - *\nhttps://www.twitch.tv/guilhermossauro11', ]
const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    const _fichas = await checkficha()
    if (_fichas.error) return client.reply(from, `Não consegui recuperar as fichas!`, id);
    const hasficha =await _fichas.find(ficha => ficha.id === chat.id);
    if (!hasficha){
        client.sendText (from, `🚫 Erro ao retornar a ficha, o grupo não possui uma ficha cadastrada !\n Solicite um administrador usar o comando !cadastroficha`);
    }
    else{
    client.reply(from,hasficha.ficha,id);
    }
    
}