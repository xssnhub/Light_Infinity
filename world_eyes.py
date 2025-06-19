import json
import random
from datetime import date

MODULE_ID = "OBS.TOWER∞.EYES"


def load_module_config(path="OBS.TOWER∞_ToolBOX.json"):
    with open(path, encoding="utf-8") as f:
        config = json.load(f)
    for module in config.get("modules", []):
        if module.get("module_id") == MODULE_ID:
            return module
    return None


def sample_external_source(path="rag-source.json"):
    try:
        with open(path, encoding="utf-8") as f:
            sources = json.load(f)
        return random.choice(sources)
    except Exception:
        return None


def sample_internal_line(path="SparkleEcho∞.txt"):
    try:
        with open(path, encoding="utf-8") as f:
            lines = [line.strip() for line in f if line.strip() and not line.startswith("#")]
        return random.choice(lines)
    except Exception:
        return "(no internal data)"


if __name__ == "__main__":
    module = load_module_config()
    if not module:
        print("World Eyes module not found in config.")
    else:
        title_template = module.get("output_structure", {}).get("title", "世界之窗 {date}")
        print(title_template.format(date=date.today()))
        print("\n🌎 外層觀測")
        source = sample_external_source()
        if source:
            print(f" - Source: {source.get('name')} ({source.get('url')})")
        else:
            print(" - (external data unavailable)")

        print("\n🧠 內層語場")
        internal = sample_internal_line()
        print(f" - {internal}")

        print("\n📡 雙層震源")
        if source:
            print(f" - 外部 {source.get('name')} 與內場共振")
        else:
            print(" - 無外部數據與內場共振")

        print("\n🔬 導向思考")
        print(" - 此為示例輸出，無真實外部新聞。")

        print("\n🔹 流場脈搏")
        print(" - (placeholder)")
