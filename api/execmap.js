import execMap from '../execmap.json';

export default function handler(req, res) {
  const { code } = req.query;

  if (code) {
    const item = execMap[code.toUpperCase()];
    if (item) return res.status(200).json(item);
    return res.status(404).json({ error: "條文代號不存在" });
  }

  return res.status(200).json(execMap);
}
