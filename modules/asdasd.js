   switch (help){
   case 'bid':

   let sorteadas= await sortearCartas()
pontos = await calcularPontos(sorteadas);
let sorteadasedited= {card:sorteadas}
let novoedited= {card:sorteadas,ponto:pontos}
deck.push(sorteadasedited)

console.log(novoedited.card)
if (sender.id === player1) {
    let player1_data;
    console.log(`Carta do deck \n ${deck[0].card}`)
jogadores_data= groupInBattle.jogadores
   }
}