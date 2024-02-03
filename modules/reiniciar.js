const { exec } = require('child_process');

exports.reiniciar = async function reiniciar(client, message) {
    const { id, from,caption,body ,sender} = message;
    const ownerNumber = "5527988999019@c.us";
    if (sender.id !== ownerNumber) {
      return client.reply(from, 'Apenas o dono do bot pode executar este comando', id);
    }

    exec('pm2 delete 0', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando 'pm2 delete 0': ${error}`);
        return client.reply(from, `Erro ao executar o comando 'pm2 delete 0': ${error}`, id);
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    exec('pm2 start ../app.js --name lil-bot', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando 'pm2 start app.js --name lil-bot': ${error}`);
        return client.reply(from, `Erro ao executar o comando 'pm2 start app.js --name lil-bot': ${error}`, id);
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
}