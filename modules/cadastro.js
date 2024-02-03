const fs = require("fs");
const isClient_message = `Você não é um VIP para alterar o seu cadastro VIP , faça o seu cadastro .
Entre em contato diretamente com o gui para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor 
e aumentar a quantidade de comandos e evitar que eu fique offline por problemas no pc do gui`
const { getVip, postfrase, posttitulo} = require("../fetch");
require('dotenv').config(); 
exports.cadastro = async function cadastro(client, message) {
    const { id, from, body, sender, caption } = message;

    const commands = caption || body || "";
    const args = commands.split(" ");
    const allVips = await getVip();
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient){
        return client.reply(from,isClient_message, id)
    }
    else if (isClient.vipstatus== false){
        return client.reply(from, isClient_message, id);
    }
    const helpMode = args[1];
    const frase = args.slice(2)
    const alteracao= frase.join(` `)
    let help = "";
    switch (helpMode) {
        case 'frase':
            if (alteracao.length === 0)return client.reply(from, "Assim eu não vou conseguir, me diga também a frase que você quer colocar",id) 
            await postfrase(isClient.id, alteracao);
            help = `Consegui enviar a sua frase \n cheque aí com o comando !vip`;
                break;

        case 'titulo':
        case 'título':
            if (alteracao.length === 0 ) return client.reply(from, "Assim eu não vou conseguir, me diga também o titulo que você quer colocar",id)  
        await posttitulo(isClient.id, alteracao);   
        help = `Consegui enviar o seu titulo \n cheque aí com o comando !vip`;
        break;
         
        default:
            help = `Menu de alteração de seu perfil VIP \n══════════════════\nPara alterar sua frase envie \n!cadastro frase (nova frase)\nPara alterar seu titulo envie \n!cadastro titulo (novo titulo)` 
            break;    
    }
await client.reply(from, help, id);

}

