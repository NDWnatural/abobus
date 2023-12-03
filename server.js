const express = require('express');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({ origin: 'https://ndwnatural.github.io' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://ndwnatural.github.io');
  next();
});

app.post('/download', async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
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

HTTP/1.1 200 OK
Access-Control-Allow-Origin: "https://ndwnatural.github.io/pagdownload/"
Access-Control-Allow-Credentials: true

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
