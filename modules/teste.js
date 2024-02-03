exports.teste = async function teste(client,message) {
    const axios = require("axios");
    require('dotenv').config();
    const inutil = client
    const url =  `${process.env.BASEURL_RECEIVER}/receber-mensagem`
  
    try {
        const response = await axios.post(url, { message });
        console.log('Resposta do servidor receptor:', response.data);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    };
  


