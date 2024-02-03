const { setBj, create_game, joingame, setjogodavelha, sortearCartas, get_game,end_game, setBlackJack } = require("../fetch");
const deck_message= `Menu do Blackjack do LIL 
══════════════════
Para criar uma sala de jogo envie  
!blackjack buscar 


Para entrar no jogo envie
!blackjack join

Para iniciar um jogo envie
apenas quando tiver 2 pessoas na sala de jogo
!blackjack start

Caso queira desistir do jogo
!blackjack encerrar

`

exports.blackjack = async function blackjack(client, message) {
    const { id, from, body, sender, caption, chat, isGroupMsg } = message;
    const commands = caption || body || "";
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const args = commands.split(" ");
    const helpMode = args[1];
    const battle= await get_game();
    const groupInBattle= battle.find(table => table.id === chat.id)
    let players;
    let isPlayer = false;
    if (groupInBattle){
    players = [groupInBattle.jogador1,groupInBattle.jogador2]
    isPlayer= players.includes(sender.id);}
    let help = "";


    switch (helpMode) { 
      case 'buscar':
            if (groupInBattle){
              if(groupInBattle.grupoOnGame === true){
              help = `O grupo Já possui um jogo em andamento entre @${players[0]} e @${players[1]}`
              }
              else{
          help =`O grupo Já possui um jogo em andamento porém não tem 2 jogadores, use \n!blackjack join\n para entrar no jogo`
        }
      }else{
      await create_game(sender.id,chat.id)
      await setBj(chat.id,sender.id)
      help = `O grupo foi aberto para um jogo  contra  @${sender.id.replace(/@c.us/g, '')}\n`;
      }
        break

      case 'join':
        if (!groupInBattle){
          help =`O grupo não possui um jogo em andamento, use \n!blackjack buscar\n para criar uma sala de jogo`
      } else if (groupInBattle.jogador1 === sender.id ){
          help = `OOOSHE , está tentando jogar contra voce mesmo ? \n espera outra pessoa entrar neste jogo`; 
      } 
        else if(groupInBattle.grupoOnGame=== true){
          help = `Foi mal , mas este jogo já esta definido , aguarde ele terminar para comecar um novo`;  }
        else {
          batalhar = await joingame(sender.id,chat.id)
          if (batalhar.error)return client.reply(from, `Não consegui te colocar no jogo!\n${batalhar.message.text}`, id);
          help = `voce entrou em um jogo contra o jogador @${groupInBattle.jogador1.replace(/@c.us/g, '')} \nagora é só enviar !blackjack start para começar`;
      }
        break

      case 'encerrar':
        if (!groupInBattle){
          help =`O grupo não possui um jogo em andamento para sair dela, use \n!blackjack buscar\n para criar uma sala de jogo` 
      } 
      else if (sender.id !== groupInBattle.jogador1 || sender.id !== groupInBattle.jogador2 || !isGroupAdmins) {
          help = `Apenas os jogadores atuais, ou administradores do grupo, podem podem finalizar a mesma`;
          return
        }
      await end_game(chat.id)
      help = `voce encerrou o jogo atual `;
      break;

      case 'start':
        if (!groupInBattle){
          help =`O grupo não possui uma batalha em andamento, use \n!blackjack buscar\n para criar uma batalha`
      }if (groupInBattle.grupoOnGame === false){
          help = `Foi mal , mas esta batalha ainda não tem 2 integrantes  , aguarde alguem entrar na sala de batalha`; 
          await client.sendTextWithMentions(from, help);
          return
      }
       if (isPlayer){
          await setBlackJack(chat.id,groupInBattle.jogador1,groupInBattle.jogador2)
          await client.sendText(from, 'jogo iniciado , voce pode pedir uma carta com o comando !bj bid',id)
          return
      }
      else {
          help = `Foi mal , mas apenas os jogadores podem inicar a batalha`;
      }
      break;  
    
      default:
        help = `${deck_message}` 
        break;    
    }

    await client.sendTextWithMentions(from, help);
}