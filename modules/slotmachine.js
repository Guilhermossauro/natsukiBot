const { getVip, randomNum, postSCrap } = require('../fetch');


const FIGURINHAS = ['🍏', '🍎','🍒', '🍊'];


exports.slotmachine = async function slotmachine(client, message) {
  const { id, from,sender } = message;
  const ownerNumber = "5527988999019@c.us";
  const allVips = await getVip()
  const isClient = allVips.find(vip => vip.phone === sender.id);
  let xp = 0 
  let xps;

  // Gere 3 slots aleatórios
  const audio = `./media/voce_errou.mp3`
  const vicaudio= `./media/aeeeee.mp3`
  const fs = require('fs');
  let slot1 = FIGURINHAS[Math.floor(Math.random() * FIGURINHAS.length)];
  let slot2 = FIGURINHAS[Math.floor(Math.random() * FIGURINHAS.length)];
  let slot3 = FIGURINHAS[Math.floor(Math.random() * FIGURINHAS.length)];

  if (sender.id == ownerNumber){
    slot1 = FIGURINHAS[Math.floor(Math.random() * 2)];
    slot2 = FIGURINHAS[Math.floor(Math.random() * 2)];
    slot3 = slot1
  }

  // Verifique se os slots são iguais
  if (slot1 === slot2 && slot2 === slot3) {
    // Envie uma mensagem para o usuário informando que ele ganhou
    const victory= ` ♣🍀  LIL CAÇA NIQUEL 🍀♣️

    【${slot1}          ${slot2}          ${slot3}】
   
   Você ganhou  com 3 ${slot1} !!!` 
    await client.reply(from, victory,id);
    await client.sendFile(from, vicaudio, 'aeeeee.mpeg', id);
    if (isClient){
      xp = await randomNum(5,80) + 10
      xps= isClient.scrap + xp
      await postSCrap(sender.id,xps)
      await client.sendTextWithMentions(from, `Parabéns @${sender.id} você recebeu  ${xp} de Scrap\n Talves alguém em bandiCamp tenha algo para trocar pelo seu scrap`);    
    }
    if (!isClient){
      await client.sendTextWithMentions(from, `Que pena @${sender.id} você iria receber  ${xp} de Scrap\n Porém como você não possui cadastro vou ter que devolver eles ao banco`); 
    }
} else {
    // Envie uma mensagem para o usuário informando os resultados dos z'slots
    const results= ` ♣🍀  LIL CAÇA NIQUEL 🍀♣️

    【${slot1}          ${slot2}          ${slot3}】
   
   Você perdeu `
   await client.reply(from,results,id)
    await client.sendFile(from, audio, 'voceerrou.mp3', results, id);
  }
}