 
def detect_focus(text):
    fuzzy_words = ["可能", "好像", "應該", "有點", "感覺", "你懂嗎"]
    fuzzy_count = sum(text.count(w) for w in fuzzy_words)

    if fuzzy_count >= 3 or len(text) > 180:
        return "focus_lost"
    elif "重點" in text or "我想說的是" in text:
        return "focus_clear"
    else:
        return "maybe_unclear"
