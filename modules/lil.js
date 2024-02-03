const { openAiQuestion, altertoken, getVip, checkVipExpired, openAiImage } = require("../fetch");

exports.lil = async function lil(client, message) {
    const { id, from, sender, caption, body} = message;
    let { pushname, verifiedName } = sender;
    const commands = caption || body || "";
    pushname = pushname || verifiedName;
    const args = commands.split(" ");
    const helpMode = args[1];
    const frase = args.slice(2)
    const question= frase.join(` `)
    const allVips = await getVip()
    const menuu=  `    Menu do LIL GPT 
    ══════════════════
    Para uma pergunta
    !lil pesquisa (sua pergunta) 
    
    Para gerar uma imagem
    !lil imagem (descricao da imagem a ser gerada)  
    `
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient = allVips.find(vip => vip.phone === sender.id);
    if (!isClient) return client.reply(from, 'Você não possui cadastro, e nem creditos para isso.\n falae com o gui para comprar um crédito ou ser um membro vip do bot  \nwa.me/5527988999019', id);
    const _checkvipexpiraton= checkVipExpired(sender.id)
    if (_checkvipexpiraton === true){
      console.log(VipExpiration)
      console.log("VIP VENCIDO")
      const message = '⚠️⚠️ Atenção! O seu  vip está vencido , entre em contato com o gui para atualizar \nwa.me/5527988999019';
      await client.sendText(from, message,id);
      return;
      }
      console.log(`CLIENTE TOKEN ${isClient.token}`)
   
    const token= isClient.token
    console.log(typeof token)
    if (isClient.token == 0 || isClient.token == null || isClient.token == undefined ||isClient.token < 0 ) {
        return client.reply(from, 'Você não possuí token de busca suficientes para fazer esta ação, solicite uma recarga . ', id);
    }
    const user = sender.id; 
   const credit = token -1;
      let help = "";
      switch (helpMode) {

        case 'pesquisa':
            if(question.length == undefined || question.length == 0 ){
                await client.react(id, "🤷🏻‍♂️");
            await client.reply(from,'Eu preciso saber tambem o que voce vai pesquisar',id)
                return
            }
            const axios = altertoken(user,credit)
            if (axios.status === "error") {
              return client.reply(from, 'Não consegui remover um crédito de você, então não farei a busca ', id);
            } 
            const pesquisado = await openAiQuestion(question)
            const answer = pesquisado.data.choices[0].text
            console.log(answer)        
            help = `Aqui ${pushname}, Creio que a resposta para a sua pergunta seria ${answer}`
            await client.reply(from,help,id);          
            return

        case 'imagem':
            if(question.length == undefined || question.length == 0 ){
                await client.react(id, "🤷🏻‍♂️");
             await client.reply(from,'Eu preciso saber como que você quer que eu gere a imagem',id)
                return
            }
            const axioss = altertoken(user,credit)
            if (axioss.status === "error") {
            return client.reply(from, 'Não consegui remover um crédito de você, então não farei a imagem ', id);
            } 
            const imagem = await openAiImage(question)
            
            help = `Aqui ${pushname},a imagem que você pediu`
            console.log(imagem)
            await client.sendFileFromUrl(from,imagem,"id.jpg",help,id); 
            return
        default:
            help = `${menuu}` 
            break;    
      }
      await client.sendTextWithMentions(from, help);
}