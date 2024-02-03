const { alterAuthorization, checkAuthorization } = require("../fetch");

exports.desautorizarbot = async function desautorizarbot(client, message) {
    const { id, from, sender, isGroupMsg, chat } = message;

       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }

    const ownerNumber = '5527988999019@c.us';
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const groupAdminss = ownerNumber + groupAdmins
    const isGroupAdmins = groupAdminss.includes(sender.id);

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }
    
    const _checkAuthorization = await checkAuthorization(chat.id);

    if (_checkAuthorization.status === "success") {
        const authorization = _checkAuthorization.authorization;

        if (authorization !== false) {
            const _alterAuthorization = await alterAuthorization(false, chat.id);

            if (_alterAuthorization.status === "success") {
                await client.sendText(from, "🔒 Autorização desativada!\nVocê poderá autorizar novamente a qualquer momento usando o comando *!autorizarbot*");
            } else {
                await client.sendText(from, `🔓 Erro ao ativar autorização!\n${_alterAuthorization.message.text}`);
            }
        } else {
            await client.sendText(from, "🔒 A autorização já estava desativada!\nVocê pode autorizar usando o comando *!autorizarbot*");
        }
    } else {
        if (_checkAuthorization.status === "error" && _checkAuthorization.message.code === 404) {
            await client.sendText(from, "🔒 A autorização já estava desativada!\nVocê pode autorizar usando o comando *!autorizarbot*");
        } else {
            await client.sendText(from, `🔓 Erro ao verificar autorização!\n${_checkAuthorization.message.text}`);
        }
    }
}