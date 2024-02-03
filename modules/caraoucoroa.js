exports.flipcoin = async function flipcoin(client, message) {
    const { id, from } = message;
    const aleatorio = Math.random()
    let resultado
    // Determina se o resultado é cara ou coroa
    if (aleatorio <= 0.5) {
        resultado = 'coroa'
    } else {
        resultado = 'cara'
    }
    // Envia a mensagem com o resultado para o chat
    client.reply(from, `Deu ${resultado}!`, id);
  



}