const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; 

app.use(bodyParser.json());

app.post('/receber-mensagem', (req, res) => {
  const {  message } = req.body;

  console.log(`Mensagem recebida do cliente  ${message}`);



  // Enviar resposta de volta para o servidor de envio
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor de recebimento rodando na porta ${port}`);
});