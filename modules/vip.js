const isClient_message = `Desculpe me, não consegui ver o seu perfil VIP pois você não é um VIP, faça o seu cadastro
    Entre em contato diretamente comigo para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
    A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor 
    e aumentar a quantidade de comandos `
const { getVip, checkVipExpired, postCredit} = require("../fetch");
const path = require("path");
require('dotenv').config();
const fs = require('fs');
exports.vip = async function vip(client, message) {
  const { id, from, sender} = message; 
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName
    const allVips = await getVip(); 
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient) return client.reply(from,isClient_message, id);
    else if (isClient.vipstatus== false){
      return client.reply(from, isClient_message, id);
  }
 
    else if (isClient.vipstatus=== false){
      return client.reply(from, isClient_message, id);
  }
    const _checkvipexpiraton= await checkVipExpired(sender.id)
    let  credits = isClient.credito  
    console.log('vip expiracao')
    console.log(_checkvipexpiraton)
    console.log('fim de vip expiration')
    if (_checkvipexpiraton === true){
      await postCredit(sender.id,0)
      credits= 0
      }

  


const decks = isClient.deck ? isClient.deck : 0;
const scrap = isClient.scrap ? isClient.scrap : 0;
const titulo = isClient.titulo ? isClient.titulo : 0;
const xp = isClient.xp ? isClient.xp : 0;
let descricao = isClient.descricao ? isClient.descricao : "";
const lilCoin = isClient.lilCoin ? isClient.lilCoin : 0;
const status = isClient.status ? isClient.status : "";
let token = isClient.token ? isClient.token : "";
let vencimento = isClient.validadeVIP ? isClient.validadeVIP : 0;
const data = vencimento
const dataObj = new Date(data);
const dia = dataObj.getDate().toString().padStart(2, '0');
const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
const ano = dataObj.getFullYear().toString();
const dataFormatada = `${dia}/${mes}/${ano}`;
  if (token == undefined){
    token= 0 
  }
  let cart;
  let cartId;
  if ('cartas' in isClient) {
    cart = isClient.cartas;
    cartId = await cart.map(cartas => cartas.id);

  } else {
    cartId = "nenhum card";
  }
  const isVIP = `
🔰 PREMIUM DO LIL BOT 🔰
🗒️ *NOME:*  ${pushname}
📱 *NUMERO:* ${(sender.id.replace(/@c.us/g, ''))}
📍 *TITULO:* ${titulo} 
📆 *VENCIMENTO VIP:* ${dataFormatada} 

*Carteira*
💵 *CREDITOS:* ${credits}
💶 *Lil Coin's:* ${lilCoin}
💠 *DECK'S:*  ${decks}
⚜️ *TOKEN'S:* ${token}
⚙️ *SCRAP:* ${scrap}

*Detalhes do Jogador*
🪪 *STATUS* ${status}
🃏 *CARD:* ${cartId}
⭐ *XP:* ${xp}

${descricao}`
let cliente_image;
if (isClient.sorteio=== false){
   cliente_image= path.resolve(__dirname, `../output/${isClient.id.replace('@c.us','')}.jpg`);
  if (cliente_image.error){
   cliente_image= path.resolve(__dirname, `../output/modelo.jpg`); 
  }
  await client.sendFile(from, cliente_image, 'profile.jpg', isVIP, id);
}
else return client.reply(from,isVIP,id)
}   