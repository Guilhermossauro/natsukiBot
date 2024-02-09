const {sortearCartas, calcularPontos, changeturn, get_game, end_game, adicionarCarta } = require("../fetch");
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
let jogadorNaMesa;
let player2;
let vez;
let pontos;
if (groupInBattle){
players = [groupInBattle.jogador1,groupInBattle.jogador2]
player1 = groupInBattle.jogador1
player2 = groupInBattle.jogador2
console.log(`player1 = ${player1} e agora player 2 ${player2}`)
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
        let resultador
  let mao = []
  let npontos


        deck.push(sorteadasEdited);
const jogadores = groupInBattle.jogadores
   jogadorNaMesa = await jogadores.find(j => j.jogador1 === sender.id || j.jogador2 === sender.id);
        let jogadorData = jogadorNaMesa
        let ajustador = jogadorData.deck;
        vez = await verificado(sender.id, chat.id);




        if (jogadorData.pontos != 0){
            ajustador.forEach(card => {
                mao.push(card);      
              });
              mao.push(sorteadas)
            maoedited= mao.slice(1)
            npontos = await calcularPontos(maoedited)
              if(npontos >= 21){
            let  help = `Suas cartas foram:  ${maoedited} \nPontuação: ${npontos}\nVoce perdeu @${sender.id}`;
            let end = `Parabéns @${vez} voce ganhou`;
              await client.sendTextWithMentions(from, help);
              await client.sendTextWithMentions(from, end);
              await end_game(chat.id)
            return
              }
       let  help = `Suas cartas são:  ${maoedited} \nPontuação: ${npontos}\nAlterei o turno para @${vez}`;
              await client.sendTextWithMentions(from, help);
              changeturn(chat.id,vez)
              resultador = await adicionarCarta(sender.id, remendo, sorteadas,npontos);
              return
        }

        resultador = await adicionarCarta(sender.id, remendo, sorteadas,pontos);
       let helper = `Suas cartas são:  ${sorteadas} \nPontuação: ${pontos}\nAlterei o turno para @${vez}`;
        await client.sendTextWithMentions(from, helper);
        changeturn(chat.id,vez)
            if (!ajustador) {
                jogadorData.deck = deck[0];
                resultador = await adicionarCarta(jogador1, remendo, sorteadas,pontos);
                if (sorteadas== 'B'){
                    sorteadas= 10
                }
                console.log(`Resultador = ${resultador}`);
                
                let help = `Suas cartas são:  ${sorteadas}\n Pontuação: ${pontos}\nAlterei o turno para @${vez} `;
                await client.sendTextWithMentions(from, help);
                changeturn(chat.id,vez)
                console.log("Deu certo a parte 1, faltam 3");
            }
        break;

    case 'hold':
        vez = await verificado(sender.id, chat.id);
        changeturn(chat.id,vez)
        let help = `\n Pulando a vez \nAlterei o turno para @${vez} `;   
        await client.sendTextWithMentions(from, help); 
        break

        default:
            help =`${deck_message}`
            break;
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

