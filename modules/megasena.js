exports.megasena = async function megasena(client, message) {
    const { id, from, sender} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const mms = [' ',' ','Gostando do bot ? \n Poderia dar uma força ao gui, se quiser se inscrever no canal dele \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww','GEEENTE O GUIIII TA EM LIIIIVE, VEM DAR UMA MORALZINHA PARA ELE NA LIIVE * - *\nhttps://www.twitch.tv/guilhermossauro11', ]
const mensagemA =    mms[parseInt(Math.random() * mms.length)];

    // Criar um Set para armazenar os números gerados aleatoriamente
    const numeros = new Set();

    // Gerar 6 números aleatórios únicos entre 1 e 60
    while (numeros.size < 6) {
        numeros.add(Math.floor(Math.random() * 60) + 1);
    }

    // Ordenar os números em ordem crescente
    const numerosOrdenados = Array.from(numeros).sort((a, b) => a - b);
    var result_str = "";
    for (var l = 0; l < numerosOrdenados.length; l++) {
        result_str += "[ " + numerosOrdenados[l] + " ] ";
    }

    const resposta = `Se eu fosse apostar na mega-sena, eu apostaria nos seguintes numeros:\n${result_str}`
    client.reply(from,resposta,id)
    
}