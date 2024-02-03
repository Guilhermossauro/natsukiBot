const fs = require("fs");
const lilTable= `Jogo da Velha da Natsuki
[ 1 ]  [ 2 ]  [ 3 ]
[ 4 ]  [ 5 ]  [ 6 ]
[ 7 ]  [ 8 ]  [ 9 ]` 

const deck_message= `Menu do Jogo Da Velha
══════════════════
Para criar uma sala de batalha envie  
!jogodavelha buscar 


Para entrar na batalha envie
!jogodavelha join

Para iniciar uma batalha envie
!jogodavelha start

Caso queira desistir do jogo
!jogodavelha encerrar

`
const { get_game, joingame, create_game, end_game, ajogodavelha, setjogodavelha} = require("../fetch");
require('dotenv').config();
exports.jogodavelha = async function jogodavelha(client, message) {
    const { id, from, body, sender, isGroupMsg, chat, caption} = message;
    const commands = caption || body || "";
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
        if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♂️");
         client.reply(from, "Este comando só pode ser usado em grupos.", id);
         return
    }
    
    const groupId = chat.groupMetadata.id;
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    const args = commands.split(" ");
    const battle= await get_game();
    const groupInBattle= battle.find(table => table.id === chat.id)
    const helpMode = args[1];
    let players;
    let isPlayer = false;
    if (groupInBattle){
    players = [groupInBattle.jogador1,groupInBattle.jogador2]
    isPlayer= players.includes(sender.id);
}
    let help = "";
    switch (helpMode) { 

        case 'buscar':
            if (groupInBattle){
                help =`O grupo Já possui um jogo em andamento, use \n!jogodavelha join\n para entrar no jogo`
            }else{
           await create_game(sender.id,chat.id)
           await ajogodavelha(chat.id)
           await setjogodavelha(chat.id,sender.id)
            help = `O grupo foi aberto para um jogo  contra  @${sender.id.replace(/@c.us/g, '')}\n`;
        }
            break;
       
        case 'encerrar':
            if (!groupInBattle){
                help =`O grupo não possui um jogo em andamento para sair dela, use \n!jogodavelha buscar\n para criar uma sala de jogo` 
            } 
            else if (sender.id !== groupInBattle.jogador1 || sender.id !== groupInBattle.jogador2 || !isGroupAdmins) {
                help = `Apenas os jogadores atuais, ou administradores do grupo, podem podem finalizar a mesma`;
              }
            await end_game(chat.id)
            help = `voce encerrou o jogo atual `;
            break;

            case 'join':  
            if (!groupInBattle){
                help =`O grupo não possui um jogo em andamento, use \n!jogodavelha buscar\n para criar uma sala de jogo`
            } else if (groupInBattle.jogador1 === sender.id ){
                help = `OOOSHE , está tentando jogar contra voce mesmo ? \n espera outra pessoa entrar neste jogo`; 
            } 
              else if(groupInBattle.grupoOnGame=== true){
                help = `Foi mal , mas este jogo já esta definido , aguarde ele terminar para comecar um novo`;  }
              else {
                batalhar = await joingame(sender.id,chat.id)
                if (batalhar.error)return client.reply(from, `Não consegui te colocar no jogo!\n${batalhar.message.text}`, id);
                help = `voce entrou em um jogo contra o jogador @${groupInBattle.jogador1.replace(/@c.us/g, '')} \nagora é só enviar !jogodavelha start para começar`;
            }
            break;

            case 'start':
                if (!groupInBattle){
                    help =`O grupo não possui uma batalha em andamento, use \n!jogodavelha buscar\n para criar uma batalha`
                    return
                }if (groupInBattle.grupoOnGame === false){
                    help = `Foi mal , mas esta batalha ainda não tem 2 integrantes  , aguarde alguem entrar na sala de batalha`; 
                    return
                }
                 if (isPlayer){
                    await setjogodavelha(chat.id,groupInBattle.jogador1)
                    await client.sendText(from, 'jogo iniciado , para fazer uma ação use o comando !move (casa)',id)
                    help= lilTable
      
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