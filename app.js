const { create, Client } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHndlr')
const options = require('./config/options')
const { getGrupo, boasVindas} = require('./fetch')
require('dotenv').config()

const start = async (client = new Client()) => {
  let grupoInfo;
  console.log('\x1b[1;32m✓ USING:', process.env.USING, '\x1b[0m');
  console.log('\x1b[1;32m✓ NUMBER:', await client.getHostNumber(), '\x1b[0m');
  console.log('\x1b[1;32m[SERVER] Servidor iniciado!\x1b[0m')

  client.onStateChanged((state) => {
    console.log('[Status do cliente]', state)
    if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
  })

  client.onGlobalParticipantsChanged(async (participantChangedEvent) => {
  
    const group = participantChangedEvent.chat;
    grupoInfo = await getGrupo(participantChangedEvent.chat);
  
    if (grupoInfo.isWelcome == true) {
     await boasVindas(participantChangedEvent, group, grupoInfo, (message) => {
        if (message) {
          console.log(`Nova mensagem de boas-vindas: ${message}`);
          client.sendTextWithMentions(message)
          // Código para armazenar a mensagem aqui
        }
      });
    }
  });

  // listening on message
  client.onMessage((async (message) => {
    let interval;

    client.getAmountOfLoadedMessages()

      .then((msg) => {
        if (msg >= 300) {
          client.cutMsgCache()
        }
      })
    setTimeout(function () {

      msgHandler(client, message)
      interval = Math.floor(Math.random() * 10 + 5) * 5000;
    }, interval);

  }))

  exports.client = client
}

create(options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))