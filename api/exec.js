const API_BASE = 'https://light-infinity.vercel.app/api/execmap';

export default async function handler(req, res) {
  const { code, mode } = req.query;
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to load execmap');

    const data = await response.json();

    if (mode === 'full') {
      return res.status(200).json({
        mode: 'full',
        source: API_BASE,
        full_law: data,
      });
    }

    if (!code || !data[code]) {
      return res.status(404).json({ error: '找不到指定條文', status: 404 });
    }

    return res.status(200).json({
      source: `${API_BASE}?code=${code}`,
      result: data[code],
    });
  } catch (err) {
    return res.status(500).json({ error: '後端條文 API 錯誤', status: 500 });
  }
}
