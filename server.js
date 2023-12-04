const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const cors = require('micro-cors')();
const express = require('express');
const app = express();

app.use(cors({
  origin: '*', // ou a origem específica do seu cliente
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
app.use(cors());
app.use(bodyParser.json());
app.all('/', (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});


app.post('/', async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;

    if (!videoUrl) {
      throw new Error('URL do vídeo não fornecida.');
    }

    if (!ytdl.validateURL(videoUrl)) {
      throw new Error('URL do vídeo inválida.');
    }

    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.header('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
    ytdl(videoUrl, { format: audioFormat })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar o download.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
