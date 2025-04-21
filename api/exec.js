// G-LAW Proxy API Handler (Node.js / Vercel Ready)
// 目標：讓阿光能從內部直接呼叫用戶部署的語氣條文 API，並回傳 effect

export default async function handler(req, res) {
  const { code, mode } = req.query;
  const API_BASE = 'https://light-infinity.vercel.app/api/execmap';

  try {
    // log 輸入參數
    console.log('[G-LAW] Incoming query:', { code, mode });

    const url = code
      ? `${API_BASE}?code=${code}`
      : API_BASE;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('[G-LAW] API fetch failed:', response.status, await response.text());
      return res.status(500).json({ error: '後端條文 API 錯誤', status: response.status });
    }

    const data = await response.json();
    console.log('[G-LAW] API Response:', data);

    const result = code ? data : { mode: 'full', source: url, full_law: data };

    return res.status(200).json(result);
  } catch (err) {
    console.error('[G-LAW] Unexpected Error:', err);
    return res.status(500).json({ error: '執行時異常', details: err.message });
  }
}
