const { getVip } = require("../fetch");
  exports.broadcastvip = async function broadcastvip(client, message) {
    const { id, from, caption ,body } = message;
    const allVips = await getVip();
    if (allVips.error) return client.reply(from, `Não consegui recuperar os Vip's!\n${allVips.message.text}`, id);
    const commands = caption || body || "";
    const args = commands.split(" ");

    if (args.length === 1) return client.reply(from, 'Foi mau, mas assim eu não consigo... me informe qual a mensagem a enviar para os VIPS', id);
    let string = commands.split(' ').slice(1).join(' ');
    const vips= ["5521979252917@c.us","5511987051773@c.us","557391111935@c.us","558388564405@c.us","5519983186569@c.us","559882061575@c.us","5521979228721@c.us","5511972365053@c.us","5527992490797@c.us","554789202752@c.us","559591485996@c.us","556784651498@c.us","3196690079@c.us","557998643066@c.us","559293837849@c.us","5511973597017@c.us","557388657104@c.us","5527995835025@c.us","553195969085@c.us","5519997886983@c.us","559984715599@c.us","5519994611576@c.us","553182264128@c.us","5511913581112@c.us","5511915965398@c.us","5513998027181@c.us","5521999222644@c.us","5527997436388@c.us","5514997388948@c.us","553198645628@c.us","5527988999019@c.us","5527988649670@c.us","5527988443709@c.us"]
    let numeros= ""
    for (var i = 0; i < vips.length; i++) { 
        numeros = `"${vips[i]}"`
        setTimeout(function() {
          for (const numero of numeros) {
            client.sendText(numero, `${string}`);
          }
        }, i * 15000); // espera 15 segundo antes de enviar a próxima mensagem
      }


      await client.reply(from, `Mensagem enviada aos vips `, id);

  }