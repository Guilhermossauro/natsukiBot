const { searchGoogle } = require("../fetch");

exports.google = async function google(client, message) {
    const { id, from, sender, caption, body} = message;
    let { pushname, verifiedName } = sender;
    const commands = caption || body || "";
    pushname = pushname || verifiedName;
    const args = commands.split(" ");
    const pesquisa = args.slice(0)
    if (args.length === 1){
        await client.react(id, "🤷🏻‍♂️");
        await client.reply(from,'Eu preciso saber tambem o que voce vai pesquisar',id)
        return
    }
    const pesquisado = await searchGoogle(pesquisa)

    const ar = `Aqui ${pushname}, Achei no google isso aqui: ${pesquisado}`

    await client.reply(from,ar,id);

}