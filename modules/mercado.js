const {cliente_compra, check_preco, cliente_venda,getVip, update_price, clientetroca,altercredit } = require("../fetch");
exports.mercado = async function mercado(client, message) {
    const isClient_message = `Desculpe me, não consegui acessar o mercado geral pois você não é um VIP, faça o seu cadastro
    Entre em contato diretamente comigo para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
    A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor  
    e aumentar a quantidade de comandos `
    const { id, from,caption ,body,sender } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");  
    const helpMode = args[1]
    const joi = args.slice(3)
    let escolha= joi.join(` `)
    escolha = escolha.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    console.log(escolha)
    const allVips = await getVip(); 
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient) return client.reply(from,isClient_message, id);
    else if (isClient.vipstatus== false){
        return client.reply(from, isClient_message, id);
    }
    const menu = `Menu do mercado do lil 
══════════════════
Para realizar uma compra 
!mercado compra
(comprar 5 Lil coins usando seu credito)

Para realizar uma venda
!mercado venda
(automaticamente configurado para vender 5 Lil coins)
Caso voce queira vender todo o seu estoque 
Envie 
!mercado venda all

Para trocar 1 crédito por 10 lil coins 
!mercado troca

Para ver o valor atual da moeda
!mercado valor

Para comprar token por seu credito 
!mercado token` 
const cripto = `LILcoin`
const plus = `+`
const menos= `-`
let help = "";
let mercadovenda;
switch (helpMode) {
    case 'vender':
        const carteira = isClient.lilCoin
        if (carteira <= 0)return client.reply(from ,"Você não possui mais nenhum Lil Coin para vender, compre alguns :D",id)
        const venda = await cliente_venda(isClient.id,5,sender.id);
             
        if (venda.error) return client.reply(from, `Não consegui realizar a sua venda! \n${venda.message.text}`, id);
        else 
        mercadovenda= await update_price(menos,cripto)
        help = `Consegui realizar a sua venda  \n cheque aí com o comando !vip`;
        break;
    case 'valor':
        const valores = await check_preco()
        if (valores.error) return client.reply(from, `Não consegui verificar o preço atual da moeda \n${valores.message.text}`, id);
        const _valorvenda= valores.valor_venda
        const _preco = valores.valor_compra
        const result= `💰LIL COIN 💰
*Preço:* ${_preco}
*Valor de venda:* ${_valorvenda}`
        help = result
        break
    case 'trocar':
        if (isClient.credito <= 0) {
            return client.reply(from, 'Você não tem créditos suficientes para fazer esta ação, solicite uma recarga ou desista. :D', id);
        }
        const user = sender.id;
    const credit = isClient.credito - 1;

    const axios = altercredit(user,credit)
      if (axios.status === "error") {
        return client.reply(from, `Não consegui remover um crédito de você, então não vou te dar lil coin's `, id);
      } 
      else {
        const trocaa= await clientetroca(sender.id,10);   
        if (trocaa.error) return client.reply(from, `Não consegui realizar a sua troca! \n${trocaa.message.text}`, id);
      }
        mercadovenda= await update_price(plus,cripto,sender.id)
        help = `Consegui realizar sua compra \n cheque aí com o comando !vip`;
        break;
 
    case 'comprar':
        
        const compra= await cliente_compra(isClient.id,5,sender.id);   
        if (compra.error) return client.reply(from, `Não consegui realizar a sua compra! \n${compra.message.text}`, id);
        
        mercadovenda= await update_price(plus,cripto)
        help = `Consegui realizar sua compra \n cheque aí com o comando !vip`;
        break;
     
    default:
        help = `${menu}` 
        break;   
        
    case 'token':
      
    break
}
await client.reply(from, help, id);

}
