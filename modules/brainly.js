const { brainlyBusca } = require("../fetch");

exports.brainly = async function brainly(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;

    const commands = caption || body || "";
    const args = commands.split(" ");

    if (args.length === 1) return client.reply(from, 'iiih parece que voce esqueceu de colocar a sua questão .tenta denovo ', id);

    const pesquisa = args.slice(1).join(" ");

    if (typeof pesquisa !== 'undefined') {
        if (pesquisa.length == 0) return client.reply(from, 'Preciso de algo para pesquisar...', id);

        await client.reply(from, `Verificando aqui com o pai dos burros a sua questão... pera um pouco`, id);
        let resultado = await brainlyBusca(pesquisa)
        const resultadoString = JSON.stringify(resultado, null, 2);
        await client.reply(from, `Resultado: ${resultadoString}`,id);

    }
}