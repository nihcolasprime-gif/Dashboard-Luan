// Vercel Serverless Function - Nuvemshop API Proxy
// Proxies requests to the Nuvemshop API to avoid CORS issues.
// URL: /api/nuvemshop/proxy?path=orders&token=xxx&userId=yyy

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path, userId, token } = req.query;

  if (!path || !userId || !token) {
    return res.status(400).json({ error: 'Parâmetros faltando: path, userId, token' });
  }

  // Build query string (remove our own params, pass the rest to Nuvemshop)
  const forwardParams = new URLSearchParams(req.query);
  forwardParams.delete('path');
  forwardParams.delete('userId');
  forwardParams.delete('token');

  const nuvemUrl = `https://api.tiendanube.com/v1/${userId}/${path}?${forwardParams.toString()}`;

  try {
    const response = await fetch(nuvemUrl, {
      method: 'GET',
      headers: {
        'Authentication': `bearer ${token}`,
        'User-Agent': 'NacaoDados (Luanframos25@gmail.com)',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao conectar com Nuvemshop', detail: err.message });
  }
}
