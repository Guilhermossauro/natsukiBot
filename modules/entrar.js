const { getVip, altercredit,checkVipExpired} = require("../fetch");
require('dotenv').config();
exports.entrar = async function entrar(client, message) {
    const { id, from, body, sender, caption,isGroupMsg } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");
    const allVips = await getVip();
    if (isGroupMsg) return client.reply(from, `Este comando só pode ser usado no privado`, id);
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient = allVips.find(vip => vip.phone === sender.id);
    if (!isClient){ 
      await client.react(id, "🤷🏻‍♂️");
     client.reply(from, 'Você não possui cadastro, e nem creditos para isso.\n fale com o gui para comprar um crédito ou ser um membro vip do bot  \nwa.me/5527988999019', id);
     return 
    }
    else if (isClient.vipstatus== false){
      return client.reply(from, isClient_message, id);
  }
  const _checkvipexpiraton= checkVipExpired(sender.id)
  if (_checkvipexpiraton === true){
    console.log("VIP VENCIDO")
    const message = '⚠️⚠️ Atenção! O seu  vip está vencido , entre em contato com o gui para atualizar \nwa.me/5527988999019';
    await client.sendText(from, message,id);
    return;
    }
    if (isClient.credito <= 0) {
         client.reply(from, 'Você não tem créditos suficientes para fazer esta ação, solicite uma recarga ou desista. :D', id);
         return
    }
    
    const frase = args.slice(1)
    const linkdogrupo = frase.join(` `)
    if (linkdogrupo.length <= 0 ) return client.reply(from, `Foi mau, mas assim eu não consigo... me diga qual vai ser o grupo que eu vou entrar`, id);
    else if (!linkdogrupo.includes("https://chat.whatsapp.com")){
      return client.reply(from, `Foi mau, mas assim eu não consigo... me diga o link do grupo que vou entrar`, id);
    }

    const user = sender.id;
    const credit = isClient.credito - 1;

    const axios = await altercredit(user,credit)
      if (axios === "error") {
        return client.reply(from, 'Não consegui remover um crédito de você, então não entrarei no grupo ', id);
      } 

        const tentativa=  await client.joinGroupViaLink(linkdogrupo,true);
        if (tentativa === 'ERROR: ServerStatusCodeError: not-authorized'){ 
         client.reply(from,'Eu fui banido recentemente deste grupo , tente redefinir o link de convite e tente novamente.',id)
         let credit = isClient.credito + 1;
          await altercredit(user,credit)
          client.reply(from,`Devolvi seu crédito como não consegui entrar no grupo \n Voce possui ${credit} créditos`,id)
         return }
         if (tentativa === 'ERROR: ServerStatusCodeError: bad-request'){ 
          client.reply(from,'Este link foi redefino ou é invalido, por favor tente me enviar o link atual do grupo .',id)
          let credit = isClient.credito + 1;
           await altercredit(user,credit)
           client.reply(from,`Devolvi seu crédito como não consegui entrar no grupo \n Voce possui ${credit} créditos`,id)
          return }
        console.log(tentativa)
        let timestamp= tentativa.t
        const date = new Date(timestamp * 1000);
const options = { 
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric'
};
const data = date.toLocaleString('pt-BR', options); 
const retorno = `
Entrei no grupo ${tentativa.formattedTitle}
----------------------------------------
Quantidade de membros:       ${tentativa.participantsCount} 
Criado no dia:                       ${data}                         
Identificador:                        ${tentativa.id} 
----------------------------------------
Descrição: 
${tentativa.groupMetadata.desc}

Voce ainda possui ${credit} créditos
`;
client.reply (from,retorno,id )      
     
}