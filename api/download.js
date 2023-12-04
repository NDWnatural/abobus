const { send } = require('micro');
const { parse } = require('url');
const ytdl = require('ytdl-core');
const cors = require('micro-cors')();

const handler = async (req, res) => {
  const { pathname, query } = parse(req.url, true);

  // Permitir solicitações POST para a rota /download
  if (req.method === 'POST' && pathname === '/download') {
    try {
      const { videoUrl } = query;

      // Verificar se a URL do vídeo foi fornecida
      if (!videoUrl) {
        throw new Error('URL do vídeo não fornecida.');
      }

      // Validar a URL do vídeo usando ytdl-core
      if (!ytdl.validateURL(videoUrl)) {
        throw new Error('URL do vídeo inválida.');
      }

      // Obter informações sobre o vídeo
      const info = await ytdl.getInfo(videoUrl);

      // Escolher o formato de áudio desejado
      const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

      // Iniciar o streaming do áudio como resposta
      ytdl(videoUrl, { format: audioFormat })
        .pipe(res);

    } catch (error) {
      console.error('Erro ao processar o download:', error);
      send(res, 500, 'Erro ao processar o download');
    }
  } else {
    send(res, 404, 'Rota não encontrada');
  }
};

module.exports = cors(handler);
