const axios = require('axios');

exports.cep = async function cep(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
    const mms = [' ',' ','Gostando do bot ? \n Poderia dar uma força ao gui, se quiser se inscrever no canal dele \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww','GEEENTE O GUIIII TA EM LIIIIVE, VEM DAR UMA MORALZINHA PARA ELE NA LIIVE * - *\nhttps://www.twitch.tv/guilhermossauro11', ]
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    const commands = caption || body || "";
    const args = commands.split(" ");

    if (args.length === 1) return client.reply(from, 'poxa eu ainda não sei aonde é isso... poderia me dizer o cep para mim pesquisar aqui ?', id);

    let response = await axios.get(`https://viacep.com.br/ws/${args[1]}/json/`);
    const { logradouro, bairro, localidade, siafi, ibge } = response.data;

    await client.reply(from, 'Buscando o CEP... pera um pouco', id);
    await client.sendText(from, `🌎️ Rua: ${logradouro}, ${bairro}, ${localidade}\nSiafi: ${siafi}, Ibge: ${ibge} `);
    
}