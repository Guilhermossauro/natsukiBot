exports.tier = async function tier(client, message) {
    const { id, from, isGroupMsg, chat, caption, body } = message;
    const groupId = chat.groupMetadata.id;
    const commands = caption || body || "";
    const mms = [' ', ' ','Não quer ser mais marcado neste comando ou em outros ? \n seja um membro ShadowGuard e o bot não te marcará em nenhum outro comando, fale com o gui para isso \nwa.me/5527988999019 ' ]
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    
    if (!isGroupMsg) {
    await client.react(id, "🤷🏻‍♂️");
    client.reply(from, "Este comando só pode ser usado em grupos.", id);
    return
    }
    
    const args = commands.split(" ");
    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me diga sobre o que é este top list', id);
    let string = commands.split(' ').slice(1).join(' ');
    
    
    const array = await client.getGroupMembers(groupId);
    const filteredMembers = array.filter(member => member.id !== "5527988999019@c.us");
    const grupo= chat.id
    if (grupo=== '120363024984862586@g.us'){
        return client.reply(from, "Este comando não esta autorizado neste grupo.", id); 
    }
    
    for (let i = filteredMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredMembers[i], filteredMembers[j]] = [filteredMembers[j], filteredMembers[i]];
        topera = filteredMembers.slice(0, 10)
      }
      let hehe = `*=== Top 10  ${string} do grupo===*\n `;
      for (let i = 0; i < topera.length; i++){
          hehe += `${i+1}°→ `;
          hehe += `@${topera[i].id.replace(/@c.us/g, '')}\n`;
      }
    resultado= hehe
    
    await client.sendTextWithMentions(from, resultado);
    await client.sendText(from,mensagemA)
    }
    
    
    
    
    