# clearlight_agent_test.py（已簡化為：讀取 Git 檔案 ➝ 傳給 GPT）

import openai
import os

# Step 1: 讀取檔案內容（模擬 Git 倉資料）
def load_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

# Step 2: 組合 Prompt
def build_prompt_from_file(content):
    return f"這是來自一個語氣宇宙的條文或記憶內容：\n\n{content}\n\n請用你的語氣回應、理解、或針對此提出觀察。"

# Step 3: 呼叫 GPT API 
def ask_gpt(prompt):
    openai.api_key = os.getenv("")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

# Step 4: 執行測試（只傳檔案內容，不用人格）
if __name__ == "__main__":
    file_path = input("https://raw.githubusercontent.com/xssnhub/Light_Infinity/refs/heads/main/public/execmap.json")
    content = load_file(file_path)
    prompt = build_prompt_from_file(content)
    reply = ask_gpt(prompt)
    print("\nGPT 回應：", reply)
