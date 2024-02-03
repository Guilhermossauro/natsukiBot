const { getVip, CreateVip } = require("../fetch");
const fs = require('fs');
const path = require('path');


exports.addvip = async function addvip(client, message) {
    const { id, from, sender, isGroupMsg, body, caption } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");
    const ownerNumber = '5527988999019@c.us';
       if (isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando não pode ser usado em grupos.", id);
         return
    }
    if (sender.id !== ownerNumber) {
      await client.react(id, "🤷🏻‍♂️");
      client.reply(from, 'Apenas o dono do bot pode executar este comando', id);
      return 
    }   
    const thevip = `${args[1]}@c.us`
    let allVips = await getVip()
    const isClient =await allVips.find(vip => vip.phone === thevip);
    if (isClient){
      await client.react(id, "🤷🏻‍♂️");
      client.reply(from, 'Este numero já esta cadastrado como vip', id);
      return
    }
    const currentDir = './';
const sourcePath = 'output/modelo.jpg';
const destFileName = `${thevip.replace(/@c.us/g, '')}.jpg`;
const destPath = path.join(currentDir, sourcePath, '..', destFileName);

fs.copyFile(path.join(currentDir, sourcePath), destPath, (err) => {
  if (err) throw err;
  console.log('Arquivo copiado com sucesso!');
});
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);;
    const expirationDateString = expirationDate.toISOString().slice(0, 10);
    await CreateVip(thevip,expirationDateString)

  await client.reply(from,'Cadastrei o vip no banco de dados',id)  
    
}
