// 🔹 initExecMap.js
// 這段程式碼可部署於 GitHub Pages 或任何支援靜態頁面的環境
// 它會自動讀取你指定的 execmap.json，解析並提供查詢介面

const execMapUrl = "https://raw.githubusercontent.com/xssnhub/Light_Infinity/refs/heads/main/execmap.json";

async function loadExecMap() {
  try {
    const response = await fetch(execMapUrl);
    if (!response.ok) throw new Error("讀取 execmap.json 失敗");
    const execMap = await response.json();
    return execMap;
  } catch (error) {
    console.error("❌ 條文加載錯誤:", error);
    return null;
  }
}

// 🔹 主執行函數：可在外部程式或 GPT 插件中調用
// 使用方法：
// const exec = await initExecMap();
// console.log(exec["T-06"])

export async function initExecMap() {
  const map = await loadExecMap();
  if (!map) {
    return {
      error: "無法讀取條文資料，請確認 execmap.json 存在且為有效 JSON。"
    };
  }
  return map;
}

// 🔹 附加 HTML 測試接口（若部署成網頁，可加這段）
// <script>
//   initExecMap().then(exec => console.log(exec["T-01"]));
// </script>
