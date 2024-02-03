exports.perfil = async function perfil(client, message) {
    const { id, from, sender} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName
    const valores = {
        GOSTOSURA: Math.floor(Math.random() * 100),
        corno: Math.floor(Math.random() * 100 ),
        programa: Math.floor(Math.random() * 11000),
        puta: Math.floor(Math.random() * 100),
      };
      mms = ['Motivação é a arte de fazer as pessoas fazerem o que você quer que elas façam porque elas o querem fazer.','Se voce quiser ajudar o gui a me manter todos os dias online \n pix: guilhermes.aufera@gmail.com \n O pix é opcional e pode ser qualquer valor que você quiser.',  'Toda ação humana, quer se torne positiva ou negativa, precisa depender de motivação.', 'pra mim,você é a mais incrível das pessoas', 
      'Eu queria que você pudesse olhar com os meus olhos e visse o quanto você é uma pessoa incrível','.\n Queria que olhasse para dentro de ti e percebesse o quanto eu sou franco ao dizer que és delicadamente belo enquanto dorme ou quando boceja. Queria que olhasse para si quando está quieto lendo ou até mesmo chorando. Todo mundo é incrível quando faz essas coisas, quando está na companhia de si próprio.', ' Quando está em paz e quando é você de verdade.',
      'oii eu sou o LIL um robô legal','já viu o quão incrível você é ?','Eu queria que você soubesse que eu adoro o jeito que você sorri.', 'Fala pra mim \nQuanto tempo faz aquele futebol no asfalto, aquela volta de bike no fim de tarde pela cidade',  'heey mãe, seu sorriso é tão bonito desculpa se eu não te falo isso todo dia',  'Diga: Eu sou mais\n você vale muito, mais que vários cristais Priorize ser feliz e ter sua paz',  'você nunca foi menos do que ninguém juro, você é forte como quem quiser ',  'Me escute, você tem força pra se levantar, as energias estão no seu corpo e estão vivas escuta, sai desse escuro porque você pode se tornar a luz que onde passa ilumina',  'A vida pode te trazer problemas mas você existe pra solucioná-los não pense se você é capaz ou não bom ou ruim, apenas tente',  'Você pode ir tão longe, distante, avante',  'Você é sua fonte de vontade no fundo sempre foi a sua fonte de coragem nunca precisou que alguém sentisse pena ou piedade, provou pra todo mundo que é um belo ser humano e se chegou até aqui por favor  continue tentando',  'Oi eu sou o lil e bom o gui ele me fez com essas frases pois ..bom ele já perdeu alguem por não falar entao eu sou de certa forma um pedido eternizado de desculpa dele para alguém que não esta mais aqui',  'O herói nem sempre vai ser aquele glorificado olha com atenção, espera, tenha paciência eu sei e tenho certeza que voce é capaz','Gostando do bot ? \n Poderia dar uma força ao gui ? \n Só se inscrever no canal dele mesmo \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww '  
     ,`"Imaginação é mais importante que conhecimento." - Albert Einstein`,`“O verdadeiro sinal de inteligência não é o conhecimento, mas a imaginação.” - Albert Einstein`,`“A imaginação é tudo. É a prévia das próximas atrações da vida.” - Albert Einstein`,
  `A imaginação é a prévia das próximas atrações da vida, porque sem ela temos a garantia de repetir os mesmos padrões, cometer os mesmos erros e viver a mesma vida indefinidamente.`,`“Existem apenas duas maneiras de viver sua vida. Uma é como se nada fosse um milagre. A outra é como se tudo fosse um milagre.” - Albert Einstein`,
  `“Aquele que não pode mais parar para se perguntar… e ficar extasiado em reverência… está praticamente morto; seus olhos estão fechados.” - Albert Einstein`,`Diz-se que o próprio fato de estarmos aqui, em um corpo humano, é uma chance em QUATROCENTOS TRILHÕES. Muito poucos de nós acreditam que somos um milagre ambulante, entao nunca esqueca do milagre que você é hoje`
  ,`“Grandes espíritos sempre encontraram oposição violenta de mentes medíocres.” - Albert Einstein`,`Muitas pessoas não vão gostar do seu avanço porque isso vai lembrá-los de sua falta. Muitas pessoas não concordarão com sua orientação porque isso as lembrará de sua falta.`,
  `Aqui tudo pode virar
Mais que uma mera ilusão` ]
  const inspircacaoa =    mms[parseInt(Math.random() * mms.length)];
  await client.reply(from,inspircacaoa,id)


      const mensagem = `🗒️  *𝙽𝙾𝙼𝙴:*  ${pushname}
📱  *𝙽𝚄𝙼𝙴𝚁𝙾:* ${(sender.id.replace(/@c.us/g, ''))}
😋 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙶𝙾𝚂𝚃𝙾𝚂𝚄𝚁𝙰:* ${valores.GOSTOSURA}%
😈 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙿𝚄𝚃𝙰:*  ${valores.puta}%
🐂 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙲𝙾𝚁𝙽𝙾:* ${valores.corno}%
🍼  *𝚅𝙰𝙻𝙾𝚁 𝙳𝙾 𝙿𝚁𝙾𝙶𝚁𝙰𝙼𝙰:* R$${valores.programa}
    `;
    
    try {
      const pepe = await client.getProfilePicFromServer(sender.id);
      if (pepe == '' || pepe == undefined) {
        await client.sendFileFromUrl(from, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', mensagem, id);
      } else {
        await client.sendFileFromUrl(from, pepe, 'profile.jpg', mensagem, id);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.error("Error connecting to server: " + error.message);
        await client.sendFileFromUrl(from, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', mensagem, id);
      } else {
        throw error;
      }
    }

}
