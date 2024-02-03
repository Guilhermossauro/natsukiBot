const path = require("path");
const fs = require("fs");
const showAll = `*Ver tudo?*\nManda um _!menu_`;

const menugrupo = `*=== Comandos para grupos ===*
NOVIDADE : couple
→ !welcome
→ !couple
→ !autorizarcomando
→ !jogodavelha 
→ !desautorizarcomando
→ !adminlista
→ !donodogrupo
→ !perfil 
→ !opiniao (eu digo minha opiniao sobre o que voce perguntar) 
→ !mencionartodos
→ !avisartodos mensagem
→ !ban @usuário
→ !add 2199988....
→ !sair (eu saio do grupo)
→ !autorizarbot (permite que o bot funciona)
→ !desautorizarbot (proíba que o bot funciona)
→ !promover
→ !rebaixar
→ !linkdogrupo
→ !kickme
→ !megasena 
→ !gravidez  
→ !fechar (fecho o grupo apenas para ADM) 
→ !abrir (abro o grupo para todos)
→ !contardias dd//mm/aaa
conto quantos dias faltam até a data informada 
substitua dd/mm/aaa pela data que você deseja saber
   ${showAll}`;


const rpg = `*=== Comandos para rpg ===*
→ !cadastroficha  
crio um molde de ficha para o grupo

→ !alterarficha
altero a ficha cadastrada do grupo

→ !ficha
retorno a ficha do grupo

→ !roll 
Faço a rolagem de dados  uso: !roll 2d100

${showAll} 
Veja as novidades com o comando !novidades 
`

const outroscomandos= `*=== Outros comandos do BOT! ===*
→ !cep (cep)
substitua (cep) pelo cep que deseja saber o endereço

→ !clima (cidade)
substitua (cidade) pela cidade que deseja saber o clima

→ !tts isso converte texto em audio
→ !meunumero
→ !moeda BTCxBRL
→ !readme
→ !roll 1d20 (faz a rolagem de dados, podendo ser quantos dados quiser e qualquer valor também
→ !perfil 
→ !vip (retorno as informações do seu VIP)
→ !lil busca
→ !lil imagem
→ !slotmachine (caça níquel)

→ !animebusca 
faz a busca de um anime a partir do link da imagem de um frame dele
Necessita ser um frame de um episódio para um resultado preciso


${showAll}`;

const menufig= `    *=== Figurinhas do BOT! ===*
    Mande uma foto, gif ou vídeo e digite _!s_ na legenda.
    Você também pode mencionar a foto, gif ou vídeo respondendo _!s_
    ${showAll}`;

exports.menu = async function menu(client, message) {
    const { id, from, body, caption } = message;
    const fig = path.resolve(__dirname, '../media/ss.jpg');
    const menudefeault= `╔══════════════════
║-Opaa eu sou a Natsuki, uma Ia em desenvolvimento para o whatsapp
║╾Criador: Guilhermossauro
║╾Licença: Apache 2.0
║╾Numero: wa.me/5527988999019
║╾Versão: 1.0
╠══════════════════
║    FAVOR LER O README DO BOT
║ *NOVIDADE comando busca de animes*
║ *!tiktoktts*
╠════════════════════
║     escolha uma das categorias:
╠════════════════════
║     Figurinhas 📄
║     Manda !menu figurinhas
║
╠════════════════════
║     Downloads  ⬇️
║     Manda !menu download
║
╠════════════════════
║     Outros comandos 🌍
║     Manda !menu outros
║
╠════════════════════
║     Grupos 📚
║     Manda !menu grupos 
║     Para me adicionar em um grupo
║    mande !entrar (link do grupo)
╠════════════════════
║     rpg 🎲
║     Manda !menu rpg
║
╠════════════════════
║Para ver as novidades em desenvolvimento 
║envie
║!novidades
------------------------------
╰╼ Sou LIL, o bot do Guilhermossauro!

Em caso de bug, envie o comando 
!reportar (bug)   
Que aviso ao Gui`;




    const commands = caption || body || "";
    const args = commands.split(" ");

    const helpMode = args[1];
    let help;

    switch (helpMode) {
        case 'figurinhas':
        case 'figurinha':
            client.sendFile(from,fig,id)
            help = `${menufig}`;
            
            break;
        case 'outros':
        case 'outro':
            help = `${outroscomandos}`
            break;
        case 'grupos':
        case 'grupo':
            help = `${menugrupo}`
            break;
        case 'rpg':
            help = `${rpg}`;
            break;
        default:
            help =`${menudefeault}`
            break;
            case 'download':
            case 'downloads':
                help = `*=== Comandos para download ===*\n→ !yt 'nome da musica' (eu baixo musica do youtube)\n${showAll} \n Veja as novidades em desenvolvimento com o comando !novidades `
    }
    await client.reply(from, help, id);
}

