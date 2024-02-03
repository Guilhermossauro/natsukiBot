const { get_game, moves, changeturn, end_game, addturns, checkWinner, getVip, randomNum, postXp} = require("../fetch");
require('dotenv').config();
exports.move = async function move(client, message) {
const { id, from, body, sender, caption,chat,isGroupMsg } = message;
const commands = caption || body || "";
let { pushname, verifiedName } = sender;
pushname = pushname || verifiedName
const args = commands.split(" ");
let battle= await get_game();
const allVips = await getVip(); 
let isClient;
if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
let clientxp= 0
let xp = 0 
let groupInBattle= battle.find(table => table.id === chat.id);
if (!groupInBattle) {
    await client.react(id, "🤷🏻‍♂️");
    client.reply(from, "Não há uma batalha em andamento neste grupo. Use o comando !game batalhar para começar uma nova batalha.", id);
     return
}
const player1= groupInBattle.jogador1
const player2= groupInBattle.jogador2
let vez = groupInBattle.playerRound
let response = `Apenas o jogador atual pode fazer um movimento\n Que no caso seria  @${vez.replace(/@c.us/g, '')}`
    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
   
if (sender.id !== groupInBattle.playerRound ) return  client.reply(from,response,id)
let _turn = groupInBattle.turns
let table = groupInBattle.table


const requiere =`Jogo da Velha do LIL
[${table[0][0]}]  [${table[0][1]}]  [${table[0][2]}]
[${table[1][0]}]  [${table[1][1]}]  [${table[1][2]}]
[${table[2][0]}]  [${table[2][1]}]  [${table[2][2]}]` 


if (args.lenght <= 1 ) {return  client.reply(from,`Para fazer uma jogada, evnie o comando !move [numero da casa aonde voce vai jogar]
    Aqui está o atual tabuleiro
    ${requiere}`,id)
}

const positions = {
    "1": [0,0],
    "2": [0,1],
    "3": [0,2],
    "4": [1,0],
    "5": [1,1],
    "6": [1,2],
    "7": [2,0],
    "8": [2,1],
    "9": [2,2]
}
const validos = [1,2,3,4,5,6,7,8,9,10]
const selecteed= args[1]
const is_position = validos.find(element => element > selecteed);
if (!is_position){
    client.reply(from,"Movimento inválido \n São movimentos validos apenas números de 1 a 9",id)
    return
}
let selected = positions[`${args[1]}`]
const movimentado= groupInBattle.table
const x = selected[0]
const y= selected[1]
if (movimentado[`${x}`][`${y}`] === "❌" || movimentado[`${x}`][`${y}`] === "🟢") {
    client.reply(from,"Posição já ocupada,selecione outra",id)
    return
}
else {
_turn = groupInBattle.turns + 1 
await moves(chat.id,sender.id,selected[0],selected[1])
await addturns(chat.id,_turn)
if (sender.id === player1){
vez = player2
}
if (sender.id === player2){
    vez = player1
}
changeturn(chat.id,vez)
battle=await  get_game();
groupInBattle= battle.find(table => table.id === chat.id);
_turn = groupInBattle.turns
table = groupInBattle.table
let winner = await checkWinner(table)
if (winner.awinner === true){
    if (winner.resultado === "❌"){
    await client.sendTextWithMentions(from, `Jogo da Velha do LIL
${table[0][0]}  ${table[0][1]}  ${table[0][2]}
${table[1][0]}  ${table[1][1]}  ${table[1][2]}
${table[2][0]}  ${table[2][1]}  ${table[2][2]}`,id)
        await client.sendTextWithMentions(from, `Parabéns @${player1} Você ganhou !`);
        await client.sendTextWithMentions(from, `Encerrei a batalha aqui`);
        await end_game(chat.id)
        xp = await randomNum(0,15)
        isClient =await allVips.find(vip => vip.phone === player1);
        if (!isClient){
            await client.sendTextWithMentions(from, `@${player1} como vcê não possui cadastro, você não receberá ${xp} de xp`);  
            return
        }
        else {
        clientxp= isClient.xp
        clientxp += xp
        await postXp(player1,clientxp)
        await client.sendTextWithMentions(from, `Parabéns @${player1} você recebeu  ${xp} de xp`);  
        }
        return   
    }
    if (winner.resultado === "🟢"){
        console.log("o primeiro iff des certo aqui meu parceiro")
        await client.sendTextWithMentions(from, `Jogo da Velha do LIL
${table[0][0]}  ${table[0][1]}  ${table[0][2]}
${table[1][0]}  ${table[1][1]}  ${table[1][2]}
${table[2][0]}  ${table[2][1]}  ${table[2][2]}`)
        await client.sendTextWithMentions(from, `Parabéns @${player2} Você ganhou !`);
                await client.sendTextWithMentions(from, `Encerrei a batalha aqui`);
            xp = await randomNum(0,15)
        isClient =await allVips.find(vip => vip.phone === player2);
        if (!isClient){
            await client.sendTextWithMentions(from, `@${player2} como vcê não possui cadastro, você não receberá ${xp} de xp`);  
            return
        }
        else {
        clientxp= isClient.xp
        clientxp += xp
        await postXp(player2,clientxp)
        await client.sendTextWithMentions(from, `Parabéns @${player2} você recebeu  ${xp} de xp`);  
        }
        await end_game(chat.id)  
        return
    }
 }

}

battle= await get_game();
groupInBattle= await battle.find(table => table.id === chat.id);
table = await groupInBattle.table

await client.reply(from, `Jogo da Velha do LIL 
${table[0][0]}  ${table[0][1]}  ${table[0][2]}
${table[1][0]}  ${table[1][1]}  ${table[1][2]}
${table[2][0]}  ${table[2][1]}  ${table[2][2]}`,id)
        if(_turn >= 10){
        client.reply(from,"Parece que o jogo acabou :D , pelo visto deu velha , vou  finalizar a batalha",id)
        await end_game(chat.id)
        return
    }

}