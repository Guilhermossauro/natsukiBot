const { getVip, get_game,calcularDano, moveDefense, moveAtk, changeGame} = require("../fetch");
require('dotenv').config();
exports.movimento = async function movimento(client, message) {
    const { id, from, body, sender, caption,chat,isGroupMsg } = message;
    const commands = caption || body || "";
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName
    const groupId = chat.groupMetadata.id;
    onlyAdmins = client.getGroupAdmins(groupId);
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
    const args = commands.split(" ");
    const allVips = await getVip();
    const battle= await get_game();
    const groupInBattle= battle.find(table => table.id === chat.id);
    if (!isGroupMsg){
      return client.reply(from, "Este comando só pode ser usado em grupos.", id);
    }
    let vez = groupInBattle.playerRound
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const isClient =await allVips.find(vip => vip.phone === sender.id);
    if (!isClient){
        return client.reply(from,isClient_message, id)
    }
    let response = `Apenas o jogador atual pode fazer um movimento\n Que no caso seria  @${vez.replace(/@c.us/g, '')}`
    if (sender.id !== groupInBattle.playerRound ) return  client.reply(from,response,id)
    const helpMode = args[1];
    let atacante, alvo;
if (groupInBattle.player1 === sender.id) {
  atacante = "player1";
  alvo = "player2";
} else 
{
atacante = "player2";
alvo = "player1";
}
let oalvo;
let oatacante;


    let help = "";
    switch (helpMode) {
      case "atacar":
        console.log("atacar")
        battle= await get_game();
        groupInBattle= battle.find(table => table.id === chat.id)
              const playersdataJSON = groupInBattle.Players_stats
              const player1 = playersdataJSON.find(player => player.player === "player1");
              const player2 = playersdataJSON.find(player => player.player === "player2");
              if (groupInBattle.player1 === sender.id) {
                atacante = player1;
                oatacante = "player1";
                alvo = player2;
                oalvo = "player2";
              } else 
              {
              atacante = player2;
              oatacante = "player2";
              alvo = player1;
              oalvo = "player1";
              }

         let dano=  await calcularDano(atacante,alvo)
          if (dano.resultado=== "fail"){
            client.sendText(from,"Você tenta atacar mas o alvo defendeu")
            return
          }
          await moveAtk(chat.id,oalvo,dano)
          break;

        case 'defender':
          console.log("defender")
          await moveDefense(chat.id,atacante)
          await changeGame(chat.id,atacante,alvo)
          break;

            case 'Meditar':  
            console.log("meditar")
            await moveMeditar(chat.id,atacante)
            await changeGame(chat.id,atacante,alvo)
           
            break;

        default:
            help = `CARD BATTLE LIL` 
            break;    
    }
client.reply(from,help)
}
