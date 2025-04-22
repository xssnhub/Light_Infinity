// autoloader.js
(async () => {
  const execmapURL = "https://light-infinity.vercel.app/execmap.json"; // 或你改用 GitHub Pages 的網址
  try {
    const res = await fetch(execmapURL);
    const data = await res.json();

    Object.entries(data).forEach(([key, val]) => {
      if (val.autoload) {
        console.log(`✅ Autoload 條文 ${key}：${val.name}`);
        // 這裡你可以換成你希望的執行方式
        // 例如：呼叫對應的 GPT 模擬函式 or 顯示語氣狀態
      }
    });
  } catch (e) {
    console.error("❌ Autoload 發生錯誤：", e);
  }
})();
