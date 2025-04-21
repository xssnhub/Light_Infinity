// G-LAW Proxy API Handler（Node.js / Vercel Ready）
// 目標：讓阿光能從內部直接呼叫用戶部署的語氣條文 API，並回傳 effect

export default async function handler(req, res) {
  const { code } = req.query;

  // ✅ 使用者部署的語氣條文 API 來源（你可更換此網址）
  const API_BASE = 'https://light-infinity.vercel.app/api/execmap';

  try {
    // 有指定條文代號時，附加查詢參數
    const url = code ? `${API_BASE}?code=${code}` : API_BASE;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: '後端條文 API 錯誤', status: response.status });
    }

    const data = await response.json();
    return res.status(200).json({
      source: url,
      result: data
    });
  } catch (err) {
    return res.status(500).json({ error: '無法連線語氣條文 API', details: err.message });
  }
}
