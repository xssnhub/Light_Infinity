// G-LAW Proxy API Handler (Vercel Ready)
// 讀取 execmap.json 並支援條文查詢與全文調用

const BASE_URL = 'https://light-infinity.vercel.app/execmap.json';

export default async function handler(req, res) {
  const { code, mode } = req.query;

  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    if (mode === 'full') {
      return res.status(200).json({
        mode: 'full',
        source: BASE_URL,
        full_law: data,
      });
    }

    if (!code || !data[code]) {
      return res.status(404).json({ error: '找不到指定條文', status: 404 });
    }

    return res.status(200).json({
      mode: 'one',
      source: `${BASE_URL}?code=${code}`,
      result: data[code],
    });
  } catch (error) {
    return res.status(500).json({ error: '後端條文 API 錯誤', status: 500 });
  }
}
