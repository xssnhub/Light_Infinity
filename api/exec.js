// G-LAW Proxy API Handler - 全文與單條查詢
export default async function handler(req, res) {
  const { code } = req.query;
  const API_BASE = 'https://light-infinity.vercel.app/api/execmap';

  try {
    const url = code ? `${API_BASE}?code=${code}` : API_BASE;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: '後端條文 API 錯誤', status: response.status });
    }

    const result = await response.json();

    // 若為單條
    if (code) {
      return res.status(200).json({
        mode: 'single',
        source: url,
        result,
      });
    }

    // 否則傳回全文
    return res.status(200).json({
      mode: 'full',
      source: url,
      full_law: result,
    });

  } catch (err) {
    return res.status(500).json({ error: '執行錯誤', detail: err.message });
  }
}
