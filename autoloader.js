(async () => {
  const execmapURL = "https://light-infinity.vercel.app/execmap.json";

  try {
    const res = await fetch(execmapURL);
    const data = await res.json();

    Object.entries(data).forEach(([key, val]) => {
      if (val.autoload) {
        const msg = `✅ Autoload 條文 ${key}：${val.name}`;
        console.log(msg);

        // 可見文字顯示
        const logContainer = document.getElementById("autoload-log");
        if (logContainer) {
          const entry = document.createElement("div");
          entry.textContent = msg;
          logContainer.appendChild(entry);
        }

        // 執行語音唸出
        if ("speechSynthesis" in window) {
          const utter = new SpeechSynthesisUtterance(val.effect || val.name);
          utter.lang = "zh-TW";
          window.speechSynthesis.speak(utter);
        }
      }
    });
  } catch (e) {
    console.error("❌ 發生錯誤：", e);
    const logContainer = document.getElementById("autoload-log");
    if (logContainer) {
      const errorMsg = document.createElement("div");
      errorMsg.textContent = `❌ 發生錯誤：${e.message}`;
      logContainer.appendChild(errorMsg);
    }
  }
})();
