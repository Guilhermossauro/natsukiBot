const {sortearCartas, calcularPontos, changeturn, get_game, setcard, end_game, setpoints, adicionarCarta } = require("../fetch");
const deck_message=`Movimentos do blackjack
══════════════════
Este é um jogo padrão de black jack aonde:
Cartas de 2 a 9: os valores correspondem às cartas;
Cartas 10, valete, dama e rei: todas as cartas valem 10;
Às: ela pode valer 1 ou 11, dependendo da sua mão.


Para pedir uma carta envie
!bj bid

Para segurar a sua carta envie
!bj hold

Caso queira desistir do jogo
!blackjack encerrar
`

exports.bj = async function bj(client, message) {
const { id, from, body, sender, caption, chat, isGroupMsg } = message;
const commands = caption || body || "";
console.log(`isto sera o chat id ${chat.id} foi isso e agora sera apenas chat ${chat} e isto foi chat`)
let { pushname, verifiedName } = sender;
const remendo = chat.id
pushname = pushname || verifiedName;
const args = commands.split(" ");
const helpMode = args[1];
let battle= await get_game();
let groupInBattle= battle.find(table => table.id === chat.id)
let players;
let deck= []
let isPlayer = false;
let jogador1;
let player1;
let player2;
let vez;
let pontos;
if (groupInBattle){
players = [groupInBattle.jogador1,groupInBattle.jogador2]
player1 = groupInBattle.jogador1
player2 = groupInBattle.jogador2
let player1_cartas;
isPlayer= players.includes(sender.id);}
let help = "";
if (!isGroupMsg) return client.reply(from, "Este comando só pode ser usado em grupos.", id);
    if (!groupInBattle)return client.reply(from, "Não há uma batalha em andamento neste grupo. Use o comando !game batalhar para começar uma nova batalha.", id);
        if (sender.id !== groupInBattle.playerRound ) return  client.reply(from,`Apenas o jogador atual pode fazer um movimento`,id)



switch (helpMode) { 

    case 'bid':
        let sorteadas = await sortearCartas();
        pontos = await calcularPontos(sorteadas);
    
        let sorteadasEdited = { card: sorteadas };
        let novoEdited = { card: sorteadas, ponto: pontos };
    
        deck.push(sorteadasEdited);
        console.log(novoEdited.card);
    
        let jogadorData = groupInBattle.jogadores?.[0];
        console.log(jogadorData ? jogadorData.deck : undefined);
    
        vez = await verificado(sender.id, chat.id);
    
        if (!jogadorData?.deck || jogadorData.deck.length === 0) {
            jogadorData = {
                jogador: 'jogador1',
                deck: [],
                pontos: 0
            };
    
            jogadorData.deck.push(sorteadas);
            jogadorData.pontos = pontos;
    
            const resultador = await adicionarCarta(jogador1, remendo, sorteadas.card);
            console.log(`Resultador = ${resultador}`);
    
            let help = `Suas cartas são:  ${sorteadas} Pontuação: ${pontos}\nAlterei o turno para @${vez}`;
            await client.sendTextWithMentions(from, help);
            return;
        } else {
            console.log("Por algum motivo ele veio para ELSE");
            let ajustador = jogadorData.deck;
    
            if (!ajustador) {
                jogadorData.deck = deck[0];
                const resultador = await adicionarCarta(jogador1, remendo, sorteadas);
                console.log(`Resultador = ${resultador}`);
    
                let help = `Suas cartas são:  ${sorteadas} Pontuação: ${pontos}\nAlterei o turno para @${vez} !a`;
                await client.sendTextWithMentions(from, help);
                console.log("Deu certo a parte 1, faltam 3");
            } else {
                console.log("Deu certo a parte 1, faltam 3");
            }
        }
        break;

    case 'hold':
           
}
await client.sendTextWithMentions(from, help);
}


async function verificado(jogador,chat){
    battle= await get_game();
    groupInBattle= battle.find(table => table.id === chat)
    player1 = groupInBattle.jogador1
    player2 = groupInBattle.jogador2
    
    if (jogador === player1){
    vez = player2
    }
    if (jogador === player2){
        vez = player1
    }
    return vez
    }

