const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const cors = require('cors');
const express = require('express');
const app = express();

// Configuração do CORS
app.use(cors());

app.use(bodyParser.json());

app.options('/', cors());  // Adicione esta linha para OPTIONS

app.post('/', async (req, res) => {
  try {
    // Lógica do seu endpoint POST
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar o download.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
