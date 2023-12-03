export const runtime = 'nodejs';

export default function handler(request, response) {
  return response.status(200).json({ text: 'I am a Serverless Function!' });
}
