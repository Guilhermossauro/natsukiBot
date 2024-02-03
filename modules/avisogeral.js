exports.countdown = async function countdown(client, message, ) {
    const { id, from, body, sender, isGroupMsg, chat,caption } = message;
    const game = getcontact ()
    const ownerNumber = "5527988999019@c.us";
    client.sendText(ownerNumber, `UM bug foi reportado, atenção ao bot requerida \n*GRUPO*: \n *MENSAGEM:* ${game} `); 

}