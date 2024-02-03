exports.gravidez = async function gravidez(client, message) {
    const { id, from, sender} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
// Gerar um número aleatório entre 0 e 1
const aleatorio = Math.random()

let resultado

// Verificar se o número é menor ou igual a 0.5
if (aleatorio <= 0.5) {
    resultado = 'positivo'
} else {
    resultado = 'negativo'
}

// envia o resultado
    const ar = `Então ${pushname}, o seu teste de gravidez deu :\n *${resultado}*`
    await client.reply(from,ar,id);
    

}