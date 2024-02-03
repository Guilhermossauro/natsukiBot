const { getVip, CreateVip, postCredit, postToken, atualizarStatus, atualizarVencimento } = require("../fetch");
const fs = require('fs');
const path = require('path');
exports.editvip = async function editvip(client, message) {
    const isClient_message = `Menu de alteração de VIP para o DONO \n══════════════════\nPara alterar o token do cliente \n!editVip token (numero) (valor)\nPara alterar  o credito do cliente \n!editVip credito (numero) (valor) \n Alterar o estado de vip do cliente \n !editvip status (numero) (1= true /2= false) \n para o vencimento vip \n !editvip vencimento 1`
    const { id, from,caption ,body,sender,isGroupMsg } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");  
    const ownerNumber = '5527988999019@c.us';
    const menudefeault= ``

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
 const regex = /^[0-9]+$/;
    const thevip = `${args[2]}@c.us`
    if (regex.test(thevip)) {
        return client.reply(from, `Nao consigo buscar o numero deste telefone por nao ser um numero`, id);
     }
    
    const helpMode = args[1];
    let allVips = await getVip(); 
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    let isClient =await allVips.find(vip => vip.phone === thevip);
    if (!isClient) return client.reply(from,isClient_message, id);
    let credittogive= args[3]
    let creditNumber = parseInt(credittogive);
    const clientcredit= isClient.credito
    const clienttoken= isClient.token
    let tokenNumber = parseInt(clienttoken);
    console.log(`tokenNumber ${tokenNumber}`)
    let creditClient= parseInt(clientcredit);
    console.log(`clientcredit ${clientcredit}`)
    console.log(typeof creditClient)
    console.log(typeof creditNumber)
    let ovalor= 0
    const _expirationDate = new Date();
    _expirationDate.setDate(_expirationDate.getDate() + 30);;
    const expirationDateString = _expirationDate.toISOString().slice(0, 10);


    let help;

    switch (helpMode) {
        case 'credito':
            ovalor= creditNumber + creditClient
           const givecredit =await  postCredit(thevip,ovalor)
            allVips = await getVip(); 
            isClient =await allVips.find(vip => vip.phone === thevip);
            help= `Atualizei os creditos do cliente para ${isClient.credito}`
        break

        case 'token':
        ovalor= creditNumber + tokenNumber 
        const givetoken= await postToken(thevip,ovalor)
         allVips = await getVip(); 
         isClient =await allVips.find(vip => vip.phone === thevip);
         help= `Atualizei os creditos do cliente para ${isClient.token}`
        break

        case 'status':
            if (creditNumber === 1 || creditNumber === 2) {
                if(creditNumber === 1){
                    creditNumber=true
                    allVips = await getVip(); 
                   isClient =await allVips.find(vip => vip.phone === thevip);
                   await atualizarStatus(thevip,creditNumber)
            help=`Atualizei o status do cliente para ${isClient.vipstatus}`
                }
                if(creditNumber === 2){
                    creditNumber=false
                    allVips = await getVip(); 
                    isClient =await allVips.find(vip => vip.phone === thevip);
                    await atualizarStatus(thevip,creditNumber)
             help=`Atualizei o status do cliente para ${isClient.vipstatus}`

                }
              } else {
                help= `Apenas valores numericos sendo eles 1 ou 2`
              }
        break
   
        
        case 'vencimento':
            atualizarVencimento(thevip,expirationDateString)
            allVips = await getVip(); 
            isClient =await allVips.find(vip => vip.phone === thevip); 
            help=`Atualizei o vencimento do cliente para ${isClient.validadeVIP}`
        break


        default:
            help =`${menudefeault}`
            break;

    }
    await client.reply(from, help, id);
}