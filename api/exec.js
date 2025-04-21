// G-LAW Proxy API Handler (Vercel Ready)
// 目標：可透過 ?code=T-XX 取得單條，或不帶參數一次取得 G-LAW 全文

export default async function handler(req, res) {
  const { code } = req.query;
  const API_BASE = 'https://light-infinity.vercel.app/api/execmap';

  try {
    // 單一條文模式
    if (code) {
      const url = `${API_BASE}?code=${code}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('單條查詢失敗');
      const result = await response.json();
      return res.status(200).json({
        mode: 'single',
        code,
        source: url,
        result,
      });
    }

    // 全文模式：不帶 code，取全部 execmap
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('全文查詢失敗');
    const full_law = await response.json();

    return res.status(200).json({
      mode: 'full',
      source: API_BASE,
      full_law,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'G-LAW proxy 錯誤',
      detail: error.message,
    });
  }
}
