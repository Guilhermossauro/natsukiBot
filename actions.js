const commands = require("./commands");

function levenshteinDistance(str1, str2) {
    // Verifica se as strings são vazias
    if (str1.length === 0) return str2.length;
    if (str2.length === 0) return str1.length;

    const m = str1.length;
    const n = str2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[m][n];
}


function encontrarComandoSemelhante(comandoDigitado, comandosExistentes, limiteSimilaridade) {
    let comandoMaisSemelhante = null;
    let menorDistancia = Infinity;

    for (const comando in comandosExistentes) {
        const distancia = levenshteinDistance(comandoDigitado, comando);
        const similaridade = 1 - distancia / Math.max(comandoDigitado.length, comando.length);

        if (similaridade >= limiteSimilaridade && distancia < menorDistancia) {
            comandoMaisSemelhante = comando;
            menorDistancia = distancia;
        }
    }

    return comandoMaisSemelhante;
}

async function start(client, message) {
    const { caption, body } = message;
    const text = caption || body || "";
    const command = text.toLowerCase().split(" ")[0] || "";
    const isCommand = text.startsWith("!") || text.startsWith(".");
    
    let commandText;

    if (isCommand) {
        commandText = command.split("").slice(1).join("");
        console.log(commandText)
        console.log(Object.keys(commands))
    }
    
    try {
        await commands[commandText](client, message);
    } catch (error) {
        console.log('UNKNOWN COMMAND:', commandText);
        if (!commands[commandText]) {
            console.log(`\x1b[1;31mComando "${commandText}" não reconhecido\x1b[0m`);
            const comandoSemelhante = encontrarComandoSemelhante(commandText, commands, 0.6);
            if (comandoSemelhante) {
                console.log(`Comando semelhante encontrado: !${comandoSemelhante}`);
                const { id, from } = message;
                await client.reply(from,`Desculpe-me, mas isto não é um comando 
vou considerar que voce queria o comando !${comandoSemelhante}`,id)  
await commands[comandoSemelhante](client, message);
            }
        } else {
            console.log(error);
        }
    }
}

const actions = {
    start: (client, message) => start(client, message)
}

module.exports = actions;
