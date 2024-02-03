const { decryptMedia } = require('@open-wa/wa-decrypt');
require('dotenv').config();


exports.revelar = async function revelar(client, message) {
    const { id, from, isMedia, mimetype , type, quotedMsg, isGroupMsg } = message;
    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
        client.reply(from, "Este comando só pode ser usado em grupos, lamento", id);   
        return
    }
    const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
    if (isMedia && type === 'image') {
        const mediaData = await decryptMedia(message, uaOverride);
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
        await client.sendFile(from, imageBase64);
    } else if (isMedia && type === 'video') {
        const mediaData = await decryptMedia(message, uaOverride);
        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
        await client.sendFile(from, videoBase64);
    } else if (quotedMsg && quotedMsg.type == 'image') {
        const mediaData = await decryptMedia(quotedMsg, uaOverride);
        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
        await client.sendFile(from, imageBase64, { author: 'faça em: (31)9195-8311', pack: 'Bot Do Guilhermossauro', keepScale: true });
    } else if (quotedMsg && quotedMsg.type == 'video') {
        const mediaData = await decryptMedia(quotedMsg, uaOverride);
        const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
        await client.sendFile(from, videoBase64, { author: 'faça em: (31)9195-8311', pack: 'Bot Do Guilhermossauro', keepScale: true });
    }
    else {
        client.reply(from, "Eu preciso receber alguma foto ou vídeo, seja ela por menção ou *!revelar* na legenda.", id);
    }
}