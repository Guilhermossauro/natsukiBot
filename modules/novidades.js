exports.novidades = async function novidades(client, message) {
    const { id, from } = message;
    const groupsUpdate = `_comandos para grupos_

    →bem vindo 
    Crie uma frase de boas vindas aos usuários que entrarem no grupo,  a frase poderá  ser totalmente personalizada
    
    →adeus
    Defina uma mensagem quando alguém for banido ou removido do grupo 
    
    →antilink 
    Crie um modo automatico de banir o usuario que enviar links para o grupo 
    
    →antighost
    Gere uma lista marcando todos os usuários,  os usuários que nao responderem poderão ser banidos com o comando banghost
    
    →Desautorizar  comando
    Desautorize um comando em especifico do grupo 
    
    →Autorizar comando
    Autorize novamente um comando que foi removido
    
    →Evento 
    Crie uma lista de evento para o usuário confirmar se estará presente ou não 
    
    →Coin 
    Crie uma moeda com nome personalizado no grupo  , util para brincadeiras e economia do grupo` 
    const rpgUpdate = `_rpg grupos_
    Comandos especializados em grupos de rpg 
   →cadastro ficha do usuário  ( deve seguir molde pré definido do bot )
   
   →sistema automatizado de batalhas em rpg seja contra npc ou pvp 
   
   →Sistema de inventário do usuário 
   Cadastre ou altere itens em seu inventário 
   
   →Sistema de durablidade do item 
   Cadastre itens com durabilidade e use comando para gastar ou alterar a durabilidade do mesmo
   
   Encontros aleatórios 
   Sistema de batalha para gerar um encontro com algum npc 
   
   Cadastro de npc 
   O adm pode criar e gerenciar os npc's que podem aparecer no comando para encontros aleatorios` 
    const downloadUpdate = ` Comandos em desenvolvimento: 
    → Download de videos do tik tok, kwai e outras redes sociais ` 
    const cardUpdate= `_lil card's_
    card's colecionáveis do bot 
  Funcionalidade das cards 
  →Batalha entre amigos estilo pvp 
  
  →Batalha estilo raid em eventos do lil 
  
  →Quest's para ganhar créditos ou deck's
  
  →Casa de leilão 
  Venda suas cartas e itens que não use mais ou que seja duplicada
  
  → Sistema de trade , troque suas cartas com seus amigos , ou envie para quem não tem` 

   await client.reply(from,downloadUpdate,id)
    client.sendText(from,cardUpdate,id)
    client.sendText(from,rpgUpdate,id)
    client.sendText(from,groupsUpdate,id)
}