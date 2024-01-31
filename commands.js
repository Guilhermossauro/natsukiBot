const { abrir } = require("./modules/abrir");
const { ficha } = require("./modules/ficha");
const { add } = require("./modules/add");
const { clear } = require("./modules/clear");
const{ cadastroficha } = require("./modules/cadastroficha")
const { adminlista } = require("./modules/adminlista");
const { apagar } = require("./modules/apagar");
const { autorizarbot } = require("./modules/autorizarbot");
const { broadcastvip } = require("./modules/broadcastvip");
const { avisartodos } = require("./modules/avisartodos");
const { game } = require("./modules/game");
const { ban } = require("./modules/ban");
const { cep } = require("./modules/cep");
const { clima } = require("./modules/clima");
const { desautorizarbot } = require("./modules/desautorizarbot");
const { donodogrupo } = require("./modules/donodogrupo");
const { fechar } = require("./modules/fechar");
const { kickme } = require("./modules/kickme");
const { linkdogrupo } = require("./modules/linkdogrupo");
const { mencionartodos } = require("./modules/mencionartodos");
const { menu } = require("./modules/menu");
const { meunumero } = require("./modules/meunumero");
const { moeda } = require("./modules/moeda");
const { nome } = require("./modules/nome");
const { perfil } = require ("./modules/perfil");
const { promover } = require("./modules/promover");
const { readme } = require("./modules/readme");
const { rebaixar } = require("./modules/rebaixar");
const { reportar } = require("./modules/reportar")
const { rolagem } = require("./modules/rolagem")
const { roll } = require("./modules/roll")
const { s } = require("./modules/s");
const { sair } = require("./modules/sair");
const { opiniao } = require ("./modules/opiniao")
const { tts } = require("./modules/tts");
const { entrar } = require("./modules/entrar");
const { saida } = require("./modules/saida");
const { tier } = require("./modules/tier");
const { contardias } = require("./modules/countdown");
//const { motivacao } = require("./modules/motivacao");
const { yt } = require("./modules/yt");
const { novidades } = require ("./modules/novidades");
const { desautorizarcomando } = require ("./modules/desautorizarcomando");
const {sorteio } = require("./modules/sorteio");
const {vip } = require("./modules/vip");
const {megasena } = require("./modules/megasena");
const {gravidez } = require("./modules/gravidez");
//const {pagarme } = require("./modules/pagarme");
//const {brainly} = require ("./modules/brainly");
const {cafe} = require ("./modules/cafe");
const{loja} = require("./modules/lojafortinite");
const{cadastro} = require("./modules/cadastro");
const{renovar} = require("./modules/renovar");
const{addvip} = require("./modules/addvip");
const{broadcastall} = require("./modules/broadcastall");
const{alterarficha} = require("./modules/alterarficha");
const{autorizarcomando} = require("./modules/alterarficha");
const{mercado} = require("./modules/mercado");
const{movimento} = require("./modules/movimento");
const{slotmachine} = require("./modules/slotmachine");
const{jogodavelha} = require("./modules/jogodavelha");
const{move} = require("./modules/move");
const{confiabilidade} = require("./modules/confiabilidade");
const{getcontact} = require("./modules/getcontact");
const{blackjack} = require("./modules/blackjack");
const{editvip} = require("./modules/editvip");
//const{google} = require("./modules/google");
const{bj} = require("./modules/bj");
const{probabilidade} = require("./modules/probabilidade");
//const{welcome} = require("./modules/welcome");
const{animebusca} = require("./modules/animebusca");
const{pau} = require("./modules/pau");
const{tiktok} = require("./modules/tiktok");
const{couple} = require("./modules/couple");
const{tapa} = require("./modules/tapa");
//const{lil} = require("./modules/lil");
const{flipcoin} = require("./modules/caraoucoroa")
const{antilink} = require("./modules/antilink");
const{revelar} = require("./modules/revelar");
//const{play} = require("./modules/play");
const{bandicamp} = require("./modules/bandicamp");
const{tiktoktts} = require("./modules/tiktoktts");
const{teste} = require("./modules/teste");
const{reel} = require("./modules/reel");


const commands = {}

//commands.play = (client, message) => play (client,message)
commands.teste = (client, message) => teste (client,message)
commands.reel = (client, message) => reel (client,message)
commands.probabilidade = (client, message) => probabilidade (client,message)
commands.bandicamp = (client, message) => bandicamp (client,message)
commands.revelar = (client, message) => revelar (client,message)
commands.clear = (client, message) => clear (client,message)
commands.antilink = (client, message) => antilink (client,message)
commands.flipcoin = (client, message) => flipcoin(client, message);
commands.cadastroficha = (client, message) => cadastroficha (client,message)
commands.editvip = (client, message) => editvip (client,message)
commands.couple = (client, message) => couple (client,message)
//commands.lil = (client, message) => lil (client,message)
commands.tiktok = (client, message) => tiktok (client,message)
commands.tapa = (client, message) => tapa (client,message)
commands.animebusca = (client, message) => animebusca (client,message)
commands.pau = (client, message) => pau (client,message)
commands.blackjack = (client, message) => blackjack (client,message)
//commands.welcome = (client, message) => welcome (client,message)
//commands.google = (client, message) => google (client,message)
commands.bj = (client, message) => bj (client,message)
commands.confiabilidade = (client, message) => confiabilidade (client,message)
commands.jogodavelha = (client, message) => jogodavelha (client,message)
commands.move = (client, message) => move (client,message)
commands.getcontact = (client, message) => getcontact (client,message)
commands.autorizarcomando = (client, message) => autorizarcomando (client,message)
commands.contardias = (client, message) => contardias(client, message);
commands.slotmachine = (client, message) => slotmachine (client,message)
commands.desautorizarcomando = (client, message) => desautorizarcomando(client, message);
commands.abrir = (client, message) => abrir(client, message);
commands.add = (client, message) => add(client, message);
commands.adminlista = (client, message) => adminlista(client, message);
commands.apagar = (client, message) => apagar(client, message);
commands.autorizarbot = (client, message) => autorizarbot(client, message);
commands.avisartodos = (client, message) => avisartodos(client, message);
commands.ban = (client, message) => ban(client, message);
commands.cep = (client, message) => cep(client, message);
commands.clima = (client, message) => clima(client, message);
commands.desautorizarbot = (client, message) => desautorizarbot(client, message);
commands.donodogrupo = (client, message) => donodogrupo(client, message);
commands.fechar = (client, message) => fechar(client, message);
commands.help = (client, message) => menu(client, message);
commands.kickme = (client, message) => kickme(client, message);
commands.linkdogrupo = (client, message) => linkdogrupo(client, message);
commands.mencionartodos = (client, message) => mencionartodos(client, message);
commands.menu = (client, message) => menu(client, message);
commands.meunumero = (client, message) => meunumero(client, message);
commands.moeda = (client, message) => moeda(client, message);
//commands.motivacao = (client, message) => motivacao (client, message);
commands.nome = (client, message) => nome(client, message);
commands.perfil = (client, message) => perfil(client, message);
commands.promover = (client, message) => promover(client, message);
commands.readme = (client, message) => readme(client, message);
commands.rebaixar = (client, message) => rebaixar(client, message);
commands.reportar = (client, message) => reportar(client, message);
commands.rolagem = (client, message) => rolagem(client, message);
commands.roll = (client, message) => roll(client, message);
commands.s = (client, message) => s(client, message);
commands.sair = (client, message) => sair(client, message);
commands.opiniao = (client, message) => opiniao(client, message);
commands.tier = (client, message) => tier(client, message);
commands.tts = (client, message) => tts(client, message);
commands.entrar = (client, message) => entrar(client, message);
commands.saida = (client, message) => saida(client, message);
commands.yt = (client, message) => yt(client, message);
commands.novidades = (client, message) => novidades(client,message);
commands.sorteio = (client, message) => sorteio (client,message);
commands.gravidez = (client, message) => gravidez (client,message);
commands.megasena = (client, message) => megasena (client,message);
commands.cafe = (client, message) => cafe (client,message);
commands.vip = (client, message) => vip (client,message);
commands.ficha = (client, message) => ficha (client,message);
commands.alterarficha = (client, message) => alterarficha (client,message);
//commands.brainly = (client, message) => brainly (client,message);
commands.broadcastvip = (client, message) => broadcastvip (client,message);
commands.addvip = (client, message) => addvip (client,message);
commands.game = (client, message) => game (client,message);
//commands.pagarme = (client, message) => pagarme (client,message);
commands.loja = (client, message) => loja (client,message);
commands.renovar = (client, message) => renovar (client,message);
commands.movimento = (client, message) => movimento (client,message);
commands.broadcastall = (client, message) => broadcastall (client,message);
commands.mercado = (client, message) => mercado (client,message);
commands.cadastro = (client, message) => cadastro (client,message);
commands.tiktoktts = (client, message) => tiktoktts (client,message);


module.exports = commands;

