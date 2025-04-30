
const fetch = require('node-fetch');
const triggerInput = process.argv[2]; // 使用 CLI 輸入的 trigger word

const SHEET_API = "https://api.sheetbest.com/sheets/4d81362c-8367-4b97-a098-6c98ea04bb98";

(async () => {
  try {
    const res = await fetch(SHEET_API);
    const data = await res.json();

    const match = data.find(entry => {
      if (!entry.trigger_word) return false;
      const keywords = entry.trigger_word.split(',').map(w => w.trim());
      return keywords.includes(triggerInput);
    });

    if (match) {
      console.log("🌌 Echo.Core∞ 震源共鳴觸發");
      console.log("🪐 ID / 日期:", match['日期／代號']);
      console.log("🧠 自我覺察：\n" + match['自我覺察']);
      console.log("💥 震源事件：\n" + match['震源核事件簿']);
      console.log("🔗 意識節點：\n" + match['意識節點']);
      console.log("🗣️ 推薦語氣：", match['語氣層'] || "清明");
    } else {
      console.log("❌ 找不到符合的震源詞：「" + triggerInput + "」");
    }
  } catch (err) {
    console.error("🚨 錯誤：無法連線或解析表單", err);
  }
})();
