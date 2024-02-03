exports.add = async function add(client, message) {
    const { id, from, sender, isGroupMsg, chat, body, caption } = message;

   if (!isGroupMsg) {  
    await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }

    
    const commands = caption || body || "";
    const args = commands.split(" ");
    
    if (args.length === 1) return client.reply(from, 'Voce esqueceu de marcar alguem para isso ... preciso saber quem voce vai adicionar', id);
    
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    const botNumber = await client.getHostNumber();
    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;

    if (!isGroupAdmins) {
        return client.reply(from, "Somente administradores do grupo podem usar este comando.", id);
    }
    
    if (!isBotGroupAdmins) return client.reply(from, "Preciso ser administrador do grupo para que isso funcione.", id);

    let number;
    if (args[1].includes('@')) {
        number = args[1].split('@55').join('');
    } else {
        number = args[1].match(/\d/g).join("");
    }
    if (number.split('')[0] == '0') number = number.split('').slice(1).join('');

    if (number.length === 10) {
        number = number.split('');
        number.splice(2, 0, 9);
        number = number.join('');
    }
    if (number.length !== 11) return client.reply(from, 'Digite um número válido.\nEx: 21999888212', id);






    try {
        await client.addParticipant(from, `55${number}@c.us`);
    } catch (error) {
        console.log (error)
        if (error.includes('ADD_PARTICIPANTS_ERROR: NOT_A_CONTACT')) {
            await client.reply(from, `iiih deu ruim, não consegui adiciona-lo.\nO participante nunca conversou comigo para eu poder adiciona`, id);
          }
        else {
            await client.reply(from, `iiih deu ruim, não consegui adiciona-lo.\n${error}`, id);
        }
    }
    await client.reply(from, `Participante adicionado com sucesso :D`, id);   

        
        

}
