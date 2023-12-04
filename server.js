const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const cors = require('cors');
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/download', async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;

    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).send('URL do vídeo inválida.');
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
