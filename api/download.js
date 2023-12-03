// api/download.js
const { send } = require('micro');
const { parse } = require('url');
const { createServer } = require('http');
const cors = require('micro-cors')();

const handler = async (req, res) => {
  const { pathname, query } = parse(req.url, true);
  if (pathname === '/download') {
    // Lógica de download aqui
    send(res, 200, 'Download pronto!');
  } else {
    send(res, 404, 'Rota não encontrada');
  }
};

export const runtime = 'nodejs';

export default function handler(request, response) {
  return response.status(200).json({ text: 'I am a Serverless Function!' });
}

const server = createServer(cors(handler));

server.listen(process.env.PORT || 3000, () => {
  console.log('Servidor Vercel Function rodando!');
});
