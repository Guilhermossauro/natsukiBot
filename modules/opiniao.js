
exports.opiniao = async function opiniao(client, message) {
    const { id, from, sender} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const mms = [
        "sim",
        "nao",
        "claro",
        "jamais",
        "dizem que Insanidade é continuar fazendo sempre a mesma coisa e esperar resultados diferentes o que é irônico considerando a reação que eu tenho com este comando né? então a minha resposta entrará em um estado quântico",
        "essa é uma boa pergunta",
        "creio ser melhor perguntar isso a um amigo próximo",
        "Você tem que aprender a dizer NÃO. Você tem que aprender a dizer NÃO para TUDO que está te afastando da vida que você deseja. As festas. A bebida. As más influências. Redes sociais... o que for para você. Se você não está onde gostaria não reclame. Você pode fazer algo sobre isso. É tudo sobre você. Você decide como gasta seu tempo todos os dias e como você gasta esse tempo é o que determina a qualidade do seu FUTURO…VOCÊ tem o poder de criar o seu FUTURO porque você decide como passar cada minuto de cada dia da sua vida. Você vai gastá-lo em mídias sociais ou em autodesenvolvimento? Você vai gastá-lo reclamando ou se aprimorando?\nVocê vai gastar seu tempo FALANDO sobre o que vai fazer ou REALMENTE FAZENDO?\nVocê vai gastar seu tempo como a maioria das pessoas - DESPENDO-O... passando o dia esperando o final de semana. Ou você fará sacrifícios AGORA para um amanhã melhor?, ENTAO... sim na minha opinião creio que sim",
        "TEM CERTEZA QUE QUER PERGUNTAR ISSO?",
        "Creio que o que eu teria para dizer iria ferir os seus sentimentos",
        "Existem muitas estrelas no céu, você poderia usar o seu tempo livre as contando ao invés de ficar tanto tempo em frente a um celular",
        "IIIH RAAAPAZ",
        "FOOOOODEU DE VEZ",
        `𝕾𝖊𝖒𝖕𝖗𝖊 𝖋𝖔𝖎 𝖙𝖆̃𝖔 𝖉𝖎𝖋𝖊𝖗𝖊𝖓𝖙𝖊 𝖆 𝖓𝖔𝖘𝖘𝖆 𝖗𝖊𝖆𝖑𝖎𝖉𝖆𝖉𝖊 
          𝕹𝖆 𝖒𝖊𝖓𝖙𝖊 𝖎𝖑𝖚𝖘𝖆̃𝖔 𝖊 𝖒𝖊𝖚 𝖉𝖊𝖛𝖆𝖓𝖊𝖎𝖔 `,
        `𝕰𝖗𝖗𝖔 𝖓𝖔 𝖘𝖎𝖘𝖙𝖊𝖒𝖆  _ǝןǝu ǝı̣ɟuoɔ õɐu_ 𝖆𝖌𝖔𝖗𝖆 𝖊𝖚 𝖒𝖊 𝖙𝖔𝖗𝖓𝖊𝖎 𝖔 𝖕𝖗𝖔́𝖕𝖗𝖎𝖔 𝖕𝖗𝖔𝖇𝖑𝖊𝖒𝖆 `,
        "Acho que você deveria ir ver o doutor",
        "essa é uma ideia muito interessante para o negócio.",
        "a melhor coisa a fazer é esperar e ver como as coisas se desenrolam.",
        "deveríamos investir mais tempo em soluções ambientais. E não gastar em baboseiras como redes sociais",
        "Nem te conto",
        "Não viaja",
        "é importante manter uma rotina de exercícios para se manter saudável. E passar menos tempo aqui",
        `A necessidade de aprovação social é uma necessidade comum entre as pessoas, e pode ser explicada a partir de diferentes perspectivas psicológicas. Algumas das principais causas incluem:
          Insegurança: As pessoas que se sentem inseguras sobre si mesmas ou sua auto-estima podem ter uma necessidade mais forte de aprovação social, pois elas acreditam que a aprovação dos outros pode ajudar a melhorar a imagem delas mesmas.
          Medo da rejeição: As pessoas que temem ser rejeitadas podem se esforçar mais para serem aceitas pelos outros, o que pode levar a uma necessidade de aprovação social.
          Falta de confiança: As pessoas que não confiam em suas próprias habilidades ou opiniões podem buscar aprovação dos outros para se sentirem mais seguras.
          Influência cultural: algumas sociedades valorizam mais a aprovação social do que outras, e as pessoas que vivem nessas sociedades podem sentir uma necessidade mais forte de aprovação.
          Trauma ou abuso: Experiências traumáticas ou abuso na infância podem afetar a forma como as pessoas se relacionam com os outros e podem levar a uma necessidade mais forte de aprovação social.
          Espero que a sua esperança de uma aprovação vinda de mim com este comando não seja apenas um reflexo de uma destas condições 
          Caso sim eu peço que busque ajuda psicológica`,
          "Você está fazendo essas perguntas enquanto o universo está por aí, cheio de mistérios. Por que não ir explorar isso em vez de me perguntar algo tão trivial?",
          "Ah, a eterna busca por respostas simples em um mundo tão complexo. Você já considerou perguntar ao Google?",
          "A vida é curta demais para gastar tempo em perguntas tão superficiais. Você já se perguntou por que está fazendo isso?",
          "Parece que alguém está mergulhando nas profundezas do inquérito existencial. Que tal surfar em ondas mais leves?",
          "Há uma abundância de questões filosóficas a serem exploradas, mas aqui estamos nós, debatendo sobre algo que nem mesmo faz cócegas na grande tapeçaria da existência.",
          "No grande esquema das coisas, sua pergunta é como uma formiga tentando entender a arquitetura de um arranha-céu. Você pode querer mirar um pouco mais baixo.",
          "Em um universo vasto e misterioso, você escolheu indagar sobre algo que não vai mudar sua vida. Prioridades, né?",
          "Eu poderia responder sua pergunta, mas acho que suas células cerebrais merecem ser gastas em algo mais desafiador.",
          "Você já considerou escrever suas perguntas em uma mensagem e atirá-las em uma garrafa ao mar? Talvez as ondas do oceano tenham uma resposta mais útil para você.",
          "Enquanto você está aqui, fazendo perguntas triviais, o tempo continua a fluir inexoravelmente em direção ao desconhecido. A propósito, o que é mesmo que você queria saber?",
          "Enquanto você pergunta sobre trivialidades, o universo está ocupado criando supernovas e estrelas cadentes. Algo mais fascinante, talvez?",
          "Acredite, existem perguntas mais interessantes na vida do que aquelas que você está fazendo agora. Mas, claro, cada um com seus hobbies.",
          "Ah, as perguntas profundas da existência humana. Enquanto você procura respostas, o universo dá de ombros e continua seu espetáculo cósmico.",
          "Você já se perguntou por que está se perguntando isso? Às vezes, a reflexão profunda pode ser mais útil do que a busca por respostas simples.",
          "Em um mundo cheio de maravilhas e mistérios, você optou por indagar sobre algo que não terá nenhum impacto significativo na sua jornada. Interessante, não?"
      ];
    const mensagemA =    mms[parseInt(Math.random() * mms.length)];
    const ar = `Então ${pushname}, na minha opinião :\n *${mensagemA}*`
    await client.reply(from,ar,id);

}