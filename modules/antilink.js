const {getGrupo, createAntilinkMethod, alterAntilinkMethod, switchAntilink } = require("../fetch");
  exports.antilink = async function antilink(client, message) {
    const frasewelcome = `Anti Link"s do LIL 
    ═════════════════════
   Para alterar o método do anti link 
    !antlink alterar (agressivo, pacifista)
        agressivo: bane usuario que enviar o link
        pacifista: Apenas remove a mensagem do próprio
  
   Para ativar ou desativar o anti link 
    !antlink switch
      
      
      `;
    const { id, from, isGroupMsg, chat, caption, body, sender } = message;
    const groupId = chat.groupMetadata.id;
    const commands = caption || body || "";
    const args = commands.split(" ");
    if (!isGroupMsg) {
      await client.react(id, "🤷🏻‍♂️");
      client.reply(from, "Este comando só pode ser usado em grupos.", id);
      return;
    }
    const helpMode = args[1];
  
    const groupAdmins = await client.getGroupAdmins(groupId);
    const isGroupAdmins = groupAdmins.includes(sender.id);
  
    const metodo = args.slice(2)
  
    let groups = await getGrupo(chat.id);
    const methodes= groups.method
    
    console.log(methodes)

    if (!isGroupAdmins) {
      await client.react(id, "🤷🏻‍♂️");
      client.reply(
        from,
        "Somente administradores do grupo podem usar este comando.",
        id
      );
      return;
    }
    let help;
    switch (helpMode) {
      case "alterar":
        if (methodes !== "pacifico" && methodes !== "agressivo"  ){
            await createAntilinkMethod(chat.id)
            client.reply(
                from,
                `Ativei o antlink deste grupo com o método pacifico, já que este grupo não havia o antlink ativo`,
                id
            )
            return   
        }
        if(groups.method === "pacifico"){
            await alterAntilinkMethod(chat.id,"agressivo")
            help= `Alterei método do antlink do grupo para agressivo\n Ou seja , eu vou banir o usuario que enviar um link`
        }
        if(groups.method === "agressivo"){
            await alterAntilinkMethod(chat.id,"pacifico") 
            help= `Alterei método do antlink do grupo para pacifico \n Ou seja, eu vou apenas apagar a mensagem com o link`
        }

        break;
  
      case "switch":
        if(groups.antlink === false){
        await switchAntilink(chat.id,true)
        }
        if(groups.antlink === true){
            await switchAntilink(chat.id,false)
            }
        groups = await getGrupo(chat.id);
        let modo;
        if(groups.antlink=== true){
            modo= "ativo"
        }
        if(groups.antlink=== false){
            modo= "desativado"
        }
          help = `alterei o modo antlink do grupo para ${modo}`;  
        break;
  
      default:
        help = `${frasewelcome}`;
    }
  
    await client.reply(from, help, id);
  };
  