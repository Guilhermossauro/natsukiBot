const actions = require("./actions.js");
const axios = require("axios");
const { checkAuthorization, checkVipExpiration,getGrupo,getBotStatus, getHistory, createHistory } = require("./fetch");
require('dotenv').config();

const bannedUsers = [
	'5521976607557@c.us', // Albarran
    '554898367844@c.us', //cara chato
    '5521974989872@c.us',
];
const silenceBannedUsers = [
	'558893752311-1627929773@g.us', // Jersu
	'555591441492-1588522560@g.us', // Code Monkey
	// '553195360492-1623288522@g.us', // Grupo dos bots
	'5511982465579-1568231201@g.us', // CanalTech Ofertas
	'120363039230076121@g.us', // CT Ofertas
	"120363041118699340@g.us", // Representantes CEEC
	"5521973550700-1452525871@g.us", // Escolada Fé 
	"5528999939949-1426629849@g.us" // Demartini's
]


const allMessages = {
    youAreBanned: () => `*_Você foi temporariamente banido, não pode usar o bot. :(_*`,
    imInMaintenance: () => `🚧️ *Estou em manutenção.* 🚧️\n\nEstão trabalhando para que eu fique melhor,\nou para que algum problema seja resolvido. 😁\nVolte mais tarde, e tente novamente. 😉`,
    imNotAuthorized: () => `*Não tenho autorização de funcionar aqui.* 😢\nPeça para que um admin execute o comando *!autorizarbot*`,
    bannedcommand: () => `Este comando foi desautorizado para ser usado neste grupo , lamento 😢 `,
};

async function authorization(id) {
    const _checkAuthorization = await checkAuthorization(id);

    if (_checkAuthorization.status === "success") {
        const authorization = _checkAuthorization.authorization;
        return authorization;
    } else {
        return false;
    }
}

module.exports = msgHandler = async (client, message) => {
    try {
        const { id, from, sender, isGroupMsg, chat, caption, isMedia, mimetype } = message;
        let { body } = message;
        const botNumber = await client.getHostNumber();
        const { formattedTitle } = chat;
        let { pushname, verifiedName } = sender;
        pushname = pushname || verifiedName;
        const commands = caption || body || "";
        const command = commands.toLowerCase().split(" ")[0] || "";
        const mensagem = commands.toLowerCase()
        const args = commands.split(" ");
        const isgrouplink= args.some(arg => arg.match(/https:\/\/chat\.whatsapp\.com\/.+/));
        let integrantes= []
        let isSenderInList = false
        let islink= false
        grupoInfo = ""


        if (isGroupMsg){
            grupoInfo= await getGrupo(chat.id)
            islink = args.some(arg => arg.match(/^(http(s)?:\/\/)?[\w-]+(\[\w-]+)+([\w,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/))
            if (islink=== false){
            islink = args.some(arg => arg.match(/^(http(s)?:\/\/)?[\w-]+(\[\w-]+)+([\w,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/m))
            }
            if (islink=== false){
            islink = args.some(arg => arg.match(/^(http(s)?:\/\/)?[\w-]+(\[\w-]+)+([\w,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]){6,}?$/m))
            }
            if (islink=== false){
          islink = args.some(arg => arg.match(/^https?:\/\//))  
          if (islink=== false){
          islink = args.some(arg => arg.startsWith("http://") || arg.startsWith("https://") || arg.startsWith("www.") ) 
          }
          if (islink=== false){
            islink= args.some(arg => arg.match(/^http:\/\//) || arg.match(/^https?:\/\//) )  
          }
            }
         
            console.log(`islink: ${islink}`)
        }
        if (isgrouplink){
            islink=true
        }


        const ownerNumber = "5527988999019@c.us";
        const isownner = sender.id.includes(ownerNumber)
        const isCommand = commands.startsWith("!") || commands.startsWith(":") || commands.startsWith(".");
        const isMaintenanceMode = false
        if (silenceBannedUsers.includes(chat.id)) {
			return;
		}

       
        console.log("---------------------------------------");
        console.log('DATE TIME	===>', new Date().toLocaleString('pt-br'));
        isGroupMsg ? console.log("FROM		===>", pushname, "IN", formattedTitle) : console.log("FROM		===>", pushname);
        console.log("FROM_ID 		===>", chat.id);
        console.log("ARGUMENTS	===>", isMedia ? `[${mimetype}]` : args);
        console.log("BODY		===>", isMedia ? `[${mimetype}]` : body);
        console.log("COMMAND		===>", command);  
       if(isGroupMsg && islink){
        if(grupoInfo.antlink === true){
            console.log(islink)  
           if(grupoInfo.method == "pacifico"){
            await client.deleteMessage(from, id, false);
            await client.sendText(from,"Neste grupo, não compartilhamos links",id)

            return
           }
           if(grupoInfo.method == "agressivo"){
            if (isownner){
                await client.sendText(from,"Só não bano porque é o dono, mas é bom ficar esperto hein, porque aqui nao pode link seu safado",id)
                return
            }
            await client.deleteMessage(from, id, false);
            await client.removeParticipant(chat.id,sender.id); 
            await client.sendText(from,"Uusuario banido por enviar link no grupo",id)
            return
           }
        

        }
       }
        

        if(!isGroupMsg && isgrouplink){
            if (command !== "!entrar" && command !== "/entrar") {
            client.reply(from,"Percebi que sua mensagem contem um link de grupo\n para me adicionar em seu grupo use o comando !entrar (linkdogrupo)",id)
            console.log('\x1b[1m\x1b[31mGLINK DE GRUPO DETECTADO\x1b[0m');
            }
        }
        

        if(!isCommand){
            console.log("não é um comando")
            return
        }

        if(isGroupMsg && isCommand && await authorization(chat.id)) {
            const VipExpiration= await checkVipExpiration(chat.id)
            if (VipExpiration === true){
            console.log("GRUPO COM VIP VENCIDO")
            if (command !== "!renovar" && command !== ".renovar"){
            const message = 'Atenção! O acesso deste grupo está vencido. Por favor, solicitar ao dono do grupo para renovar a autorização com o comando !renovar.';
            await client.sendText(from, message,id);
            return
            ;
        }
            }
        }
        if (isCommand && bannedUsers.includes(chat.id)) {
           console.log('\x1b[1m\x1b[31mGUSUARIO BANIDO IGNORANDO\x1b[0m');
            await client.sendText(from, allMessages.youAreBanned(), id);
			return;
		}
        if (isGroupMsg && !await authorization(chat.id)) {
            if (command !== "!autorizarbot" && command !== "/autorizarbot") {
                console.log("\x1b[1;31mNOT AUTHORIZED! IGNORING\x1b[0m");
                if (isCommand) {
                    return client.reply(from,'nao estou autorizado a funcionar no grupo \n Tente usar o comando !autorizarbot',id);
                } else {
                    return;
                }
            }
        }
        if (isCommand && isMaintenanceMode) {
            console.log("\x1b[1;31mMAINTENANCE_MODE ON! IGNORING\x1b[0m");
            return client.sendText(from, allMessages.imInMaintenance(), id);
        }
        if (isGroupMsg && !await authorization(chat.id)) {
            if (command !== "!autorizarbot" && command !== "/autorizarbot") {
                console.log("\x1b[1;31mNOT AUTHORIZED! IGNORING\x1b[0m");
                if (isCommand) {
                    return client.reply( allMessages.imNotAuthorized());
                } else {
                    return;
                }
            }
            }
        
        actions.start(client, message);
    } catch (err) {
        console.log("\x1b[1;31m[ERROR]\x1b[0m", err);
    }
}