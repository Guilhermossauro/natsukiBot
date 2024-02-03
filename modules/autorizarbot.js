const { alterAuthorization, checkAuthorization, createAuthorization } = require("../fetch");

exports.autorizarbot = async function autorizarbot(client, message) {
    const { id, from, sender, isGroupMsg, chat } = message;

       if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);;
    const expirationDateString = expirationDate.toISOString().slice(0, 10);
    // Formata a data de vencimento no formato dd/mm/aaaa

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

        if (authorization !== true) {
            const _alterAuthorization = await alterAuthorization(true, chat.id);

            if (_alterAuthorization.status === "success") {
                await client.sendText(from, "🔓 Autorização ativada!\nExperimente o comando !menu para ver todos os comandos.");
            } else {
                await client.sendText(from, `🔒 Erro ao ativar autorização!\n${_alterAuthorization.message.text}`);
            }
        } else {
            await client.sendText(from, "🔓 A autorização já estava ativada!\nVocê pode revogar a autorização usando o comando *!desautorizarbot*");
        }
    } else {
        if (_checkAuthorization.status === "error" && _checkAuthorization.message.code === 404) {
            const _createAuthorization = await createAuthorization(true, chat.id, expirationDateString);

            if (_createAuthorization.status === "success") {
                await client.sendText(from, "🔓 Autorização ativada!\nExperimente o comando !menu para ver todos os comandos.");
            } else {
                await client.sendText(from, `🔒 Erro ao criar uma autorização!\n${_createAuthorization.message.text}`);
            }
        } else {
            await client.sendText(from, `🔒 Erro ao verificar autorização!\n${_checkAuthorization.message.text}`);
        }
    }
}