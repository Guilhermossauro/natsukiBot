const { post } = require("request-promise");
const {
  getGrupo,
  alterWelcome,
  setWelcome,
  postMember,
  getGrupoMembros,
  getRegistry,
  createPostMember,
  getRegistred,
} = require("../fetch");
exports.welcome = async function welcome(client, message) {
  const frasewelcome = `Saudações do LIL 
    ══════════════════
    Para criar uma saudação quando alguem entrar  
    !welcome criar
    
    
    Para alterar a saudação já existente no grupo 
    !welcome alterar

    Para ativar ou desativar a saudação 
    !welcome switch
    
    
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
  const botNumber = await client.getHostNumber();
  const isGroupAdmins = groupAdmins.includes(sender.id);
  const groupMem = await client.getGroupMembers(groupId);
  let groupMemID = groupMem.map((id) => id.id);

  const frase = args.slice(2);
  const _welcome = frase.join(` `);
  let integrantes = [];
  let notedited = [];

  const groups = await getGrupo(chat.id);
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
    case "criar":
      if (_welcome.length <= 0) {
        await client.react(id, "🤷🏻‍♂️");
        client.reply(
          from,
          `Foi mau, mas assim eu não consigo... me diga qual vai ser a frase de boas vindas do grupo `,
          id
        );
        return;
      }

      try {
        const criado = await alterWelcome(chat.id, _welcome);
        if (criado.status == "error") {
          client.reply(
            from,
            `Houve um erro aqui, envie este código de erro ao gui para ele ver o que houve`,
            id
          );
        } else {
          help = "Criei a frase de boas vindas do grupo :D";
        }
      } catch (error) {
        client.reply(from, `Aqui o erro que houve aqui \n${error}`, id);
      }
      break;

    case "alterar":
      if (_welcome.length <= 0) {
        await client.react(id, "🤷🏻‍♂️");
        client.reply(
          from,
          `Foi mau, mas assim eu não consigo... me diga qual vai ser a frase de boas vindas do grupo `,
          id
        );
        return;
      }

      try {
        const criado = await alterWelcome(chat.id, _welcome);
        if (criado.status == "error") {
          client.reply(
            from,
            `Houve um erro aqui, envie este código de erro ao gui para ele ver o que houve`,
            id
          );
        } else {
          help = "alterei a frase de boas vindas do grupo :D";
        }
      } catch (error) {
        client.reply(from, `Aqui o erro que houve aqui \n${error}`, id);
      }
      break;

    case "switch":
      if (groups.isWelcome == true) {
        await setWelcome(chat.id, false);

        help = "Desativei a saudação do grupo";
      }
      if (groups.isWelcome == false) {
        await setWelcome(chat.id, true);
        for (const member of groupMem) {
          if (member.id !== botNumber) {
            memberEdited = { numero: member };
            integrantes.push(memberEdited);
            notedited.push(member);
            await postMember(chat.id,member.id)
          }
        }
        const registreds = await getRegistred();
        const isregistered = await registreds.find(
          (group) => group.id === chat.id
        );

        help = "Ativei a saudação do grupo";
      }

      break;

    default:
      help = `${frasewelcome}`;
  }

  await client.reply(from, help, id);
};
