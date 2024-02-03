const isClient_message = `Você não é um VIP para poder jogar com os cards, faça o seu cadastro com o gui.
    Este jogo é exlusivamente para os vips porém os jogos 
    !jogavelha 
    !blackjack 
    sao gratuitos
Entre em contato diretamente com ele  para isso \nhttps://api.whatsapp.com/send?phone=5527988999019&text=Quero%20ser%20um%20VIP%20no%20BOT
A cada cadastro realizado mais próximos estaremos de colocar o bot em um servidor 
e aumentar a quantidade de comandos `

const deck_message= `Menu do GameCard do LIL 
══════════════════
Para criar uma sala de batalha envie  
!game batalhar 

Para alterar seu deck envie 
!game card (id do seu card escolhido)

Para entrar na batalha envie
!game join

Para iniciar uma batalha com os 
jogadores envie 
!game start

Caso queira desistir da batalha
!game encerrar
`
const { getVip, get_game, joingame, create_game, set_players_params, end_game, checkVipExpired, get_cards} = require("../fetch");
require('dotenv').config();
exports.game = async function game(client, message) {
    const { id, from, body, sender, caption,chat,isGroupMsg } = message;
    const commands = caption || body || "";
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName
        if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    
    const groupId = chat.groupMetadata.id;
    onlyAdmins = client.getGroupAdmins(groupId);
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    const args = commands.split(" ");
    let allVips = await getVip();
    let battle= await get_game();
    let groupInBattle= battle.find(table => table.id === chat.id)
    let playersStats = []

    if (groupInBattle && groupInBattle.error){
        console.log(`houve uma falha ao solicitar o grupo em batalha mencionado ${groupInBattle.message.text}`)
    }
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient){
        return client.reply(from,isClient_message, id)
    }
    else if (isClient.vipstatus== false){
        return client.reply(from, isClient_message, id);
    }
    
    const _checkvipexpiraton= checkVipExpired(sender.id)
    if (_checkvipexpiraton === true){
      console.log("VIP VENCIDO")
      const message = '⚠️⚠️ Atenção! O seu  vip está vencido , entre em contato com o gui para atualizar \nwa.me/5527988999019';
      await client.sendText(from, message,id);
      return;
      }
    const helpMode = args[1];

    let help = "";
    switch (helpMode) { 

        case 'batalhar':
            if (groupInBattle){
                help =`O grupo Já possui uma batalha em andamento, use \n!game join\n para entrar na batalha`
            }else{
           await create_game(sender.id,chat.id)
            help = `O grupo foi aberto para uma batalha contra  @${sender.id.replace(/@c.us/g, '')}\n`;
        }
            break;
        case 'card':
  
            help = `Consegui selecionar o card que voce pediu `;
            break;
        case 'encerrar':
            if (!groupInBattle){
                help =`O grupo não possui uma batalha em andamento para sair dela, use \n!game batalhar\n para criar uma batalha` 
            } 
            else if (sender.id !== groupInBattle.jogador1 || sender.id !== groupInBattle.jogador2 || !isGroupAdmins) {
                help = `Apenas os jogadores atuais, ou administradores do grupo, podem podem finalizar a mesma`;
              }
            await end_game(chat.id)
            help = `voce encerrou a batalha `;
            break;

            case 'join':  
            if (!groupInBattle){
                help =`O grupo não possui uma batalha em andamento, use \n!game batalhar\n para criar uma batalha`
            } else if (groupInBattle.jogador1 === sender.id ){
                help = `OOOSHE , está tentando jogar contra voce mesmo ? \n espera outra pessoa entrar na  batalha`; 
            } 
              else if(groupInBattle.grupoOnGame=== true){
                help = `Foi mal , mas esta batalha já esta definida , aguarde ela terminar para comecar uma nova`;  }
              else {
                if (groupInBattle.grupoOnGame === false){
                    batalhar = await joingame(sender.id,chat.id)
                   }
                if (batalhar.error)return client.reply(from, `Não consegui te colocar na batalha!\n${batalhar.message.text}`, id);
                help = `voce entrou na batalha contra o jogador @${groupInBattle.jogador1.replace(/@c.us/g, '')}`;

            }
            break;

        case 'start':
            if (!groupInBattle){
                help =`O grupo não possui uma batalha em andamento, use \n!game batalhar\n para criar uma batalha`
            } else if (groupInBattle.grupoOnGame === false){
                help = `Foi mal , mas esta batalha aind não tem 2 integrantes  , aguarde alguem entrar na sala de batalha`; 
            }
            else if (sender.id == groupInBattle.jogador1 || sender.id == groupInBattle.jogador2){
                let player1= groupInBattle.jogador1
                let player2= groupInBattle.jogador2
                battle= await get_game();
                groupInBattle= battle.find(table => table.id === chat.id)

                allVips =await  getVip()
                const param_player1 = await groupInBattle.jogador1
                const param_player2 = await groupInBattle.jogador2
                const vip1 = await allVips.find(vip => vip.phone === param_player1);
                let stringVip1 = JSON.stringify(vip1)
                stringVip1 = await JSON.parse(stringVip1)
                const acarta1 = stringVip1.cartas.map(carta => carta.id)
                console.log(`a carta 1 é essa aqui ó ${acarta1}`)
                const vip2 = await allVips.find(vip => vip.phone === param_player2);
                let stringVip2 = JSON.stringify(vip2)
                stringVip2 = await JSON.parse(stringVip2)
                const acarta2 = stringVip2.cartas.map(carta => carta.id)
               
                
                const lecarta1 =await get_cards(acarta1[0])
                const becarta1 = JSON.stringify(lecarta1)
                const carta1 = await JSON.parse(becarta1)
                console.log(carta1)
                const lecarta2 =await get_cards(acarta2[0])
                const becarta2 = JSON.stringify(lecarta2)
                const carta2 = await JSON.parse(becarta2)
                console.log(carta2)
                 playersStats.push({
                   player: 'player1',
                   life: carta1.life,
                   atk: carta1.atk,
                   CA: carta1.CA,
                   Def: carta1.Def,
                   debuff: false,
                   buff: false,
                   stunned: false,
                   confused: false,
                   condened: false,
                   ondefence: false,
                   meditation: false
                   })
                   playersStats.push({
                       player: 'player2',
                       life: carta2.life,
                       atk: carta2.atk,
                       CA: carta2.CA,
                       Def: carta2.Def,
                       debuff: false,
                       buff: false,
                       stunned: false,
                       confused: false,
                       condened: false,
                       ondefence: false,
                       meditation: false
                       })
                await set_players_params(chat.id,playersStats,player1,player2)
                help= `batalha iniciada , para fazer uma ação use o comando !movimento`
  
            }
            else {
                help = `Foi mal , mas apenas os jogadores podem inicar a batalha`;
            }
            break;

            case 'test':
                if (!groupInBattle){
                    help =`O grupo não possui uma batalha em andamento, use \n!game batalhar\n para criar uma batalha`
                    return
                } else if (groupInBattle.grupoOnGame === false){
                    help = `Foi mal , mas esta batalha aind não tem 2 integrantes  , aguarde alguem entrar na sala de batalha`; 
                    return
                }
                battle= await get_game();
                groupInBattle= battle.find(table => table.id === chat.id)
                const playersdataJSON = groupInBattle.Players_stats
                const player1 = playersdataJSON.find(player => player.player === "player1");
                const player2 = playersdataJSON.find(player => player.player === "player2");
                

                console.log(`esse seria o players stats 1 ${player1.Def} e esse \n seria o player 2 ${player2}`)
        
         
        default:
            help = `${deck_message}` 
            break;    

    
    }
console.log(playersStats)

await client.sendTextWithMentions(from, help);

}



    
