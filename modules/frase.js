const axios = require("axios");
require('dotenv').config();
const path = require("path");
const fs = require("fs");
const BASEURL_BOTINFORS = process.env.BASEURL_BOTINFORS;
const guardar = axios.get(`${BASEURL_BOTINFORS}/frases/`)
exports.frase = async function frase(client, message) {
const { id, from, sender, caption, body,quotedMsg} = message;
const commands = caption || body || "";
let { pushname, verifiedName } = sender;
pushname = pushname || verifiedName
const args = commands.split(" ");
const mms = [' ',' ','Gostando do bot ? \n Poderia dar uma força ao gui, se quiser se inscrever no canal dele \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww','GEEENTE O GUIIII TA EM LIIIIVE, VEM DAR UMA MORALZINHA PARA ELE NA LIIVE * - *\nhttps://www.twitch.tv/guilhermossauro11', ]
const mensagemA =    mms[parseInt(Math.random() * mms.length)];
if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me diga qual vai ser a sua frase', id);

let string = commands.split(' ').slice(1).join(' ');
axios.post(`${BASEURL_BOTINFORS}/frases/`, {
    frase: string,
}).then((res) => {
    return {
        status: "success"
    }
}
).catch((err) => {
    console.log(`error: ${err}`);
    return {
        status: "error",
        message: {
            code: err.response?.status || err,
            text: err.response?.statusText || ''
        }
    }
});
client.reply(from,"Sua frase foi registrada em meu banco de dados :D",id)
client.react(quotedMsg,`👍`,from)
await client.reply(from,mensagemA,id)
}