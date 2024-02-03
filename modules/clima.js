const axios = require('axios');

exports.clima = async function clima(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
    const mms = [' ',' ','Gostando do bot ? \n Poderia dar uma força ao gui, se quiser se inscrever no canal dele \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww','GEEENTE O GUIIII TA EM LIIIIVE, VEM DAR UMA MORALZINHA PARA ELE NA LIIVE * - *\nhttps://www.twitch.tv/guilhermossauro11', ]
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    const commands = caption || body || "";
    const args = commands.split(" ");

    if (args.length === 1) return client.reply(from, 'iiih parece que voce esqueceu de colocar a cidade.tenta denovo ', id);

    const cidade = args.slice(1).join(" ");

    if (typeof cidade !== 'undefined') {
        if (cidade.length == 0) return client.reply(from, 'Preciso de um local...', id);

        await client.reply(from, `Verificando com São Pedro como está o clima em ${cidade} ... pera um pouco`, id);

        let clima = await axios.get(`https://weather.contrateumdev.com.br/api/weather/city/?city=${encodeURI(cidade)}`);

        if (clima?.data?.cod == '404') return await client.reply(from, `Uai... ${clima?.data?.message}`, id);
let marquer= "```"
let divisor= '- - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
let retorno = `
O clima agora em ${cidade}
${divisor}
${marquer}Tempo:${marquer}                               | ${clima.data.weather[0].description}
${marquer}Temperatura atual:${marquer} | ${clima?.data?.main?.temp.toFixed(2)}ºC
${marquer}Min:${marquer}                                    | ${clima?.data?.main?.temp_min.toFixed(2)} ºC
${marquer}Max:${marquer}                                    | ${clima?.data?.main?.temp_max.toFixed(2)} ºC
${marquer}Sensação térmica:${marquer}    | ${clima?.data?.main?.feels_like.toFixed(2)} ºC
${marquer}Umidade:${marquer}                           | ${clima?.data?.main?.humidity}% 
${divisor}
Coordenadas: 
lat: ${clima?.data?.coord?.lat}
lon: ${clima?.data?.coord?.lon}`
await client.sendText(from,retorno,id)
    } else {
        return client.reply(from, 'Preciso de uma cidade...', id);
        
    }
    
}   