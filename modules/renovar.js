const isClient_message = `Voce não possui creditos para isso e tambem você não é um VIP, faça o seu cadastro .
    Entre em contato diretamente com o gui para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
    A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor 
    e aumentar a quantidade de comandos e evitar que eu fique offline por problemas no pc do gui`
const { getVip, alterVencimento,checkVipExpired,checkVipExpiration, altercredit} = require("../fetch"); 
require('dotenv').config();
exports.renovar = async function renovar(client, message) {
    const { id, from, sender,chat} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName
    const allVips = await getVip();
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient) return client.reply(from,isClient_message, id);
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
        return client.reply(from, 'Você não tem créditos suficientes para fazer esta ação, solicite uma recarga ou desista. :D', id);
    }
    const VipExpiration= await checkVipExpiration(chat.id)
            if (VipExpiration.expirationDate === false){
            const message = 'Atenção! O grupo ainda não tem um cadastro vencido, então não irei renovar o cadastro.';
            await client.sendText(from, message,id);
            return;
            }
    const _expirationDate = new Date();
    _expirationDate.setDate(_expirationDate.getDate() + 30);;
    const expirationDateString = _expirationDate.toISOString().slice(0, 10);
    const user = sender.id;
    const credit = isClient.credito - 1;
    const axios = altercredit(user,credit)
      if (axios.status === "error") {
        return client.reply(from, 'Não consegui remover um crédito de você, então não renovarei o acesso deste grupo ', id);
      } 



    const alterar_vencimento= await alterVencimento(chat.id,expirationDateString)
    console.log(alterar_vencimento)
            if (alterar_vencimento.status === "success"){
                await client.sendText(from, "✅ Autorização renovada!\nExperimente o comando !menu para ver todos os comandos.");
            }
            else if (alterar_vencimento.status=== "error")
            {
                await client.sendText(from, `🚫 Erro ao renovar autorização!\n${alterar_vencimento.message.text}`);
            }
            else {
                await client.sendText(from, "✅ A autorização já estava renovado!");
            }

}