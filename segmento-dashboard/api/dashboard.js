export default function handler(req, res) {
  res.status(200).json({
    mentions: 12540,
    engagement: 28450,
    positive: 62,
    neutral: 25,
    negative: 13
  });
}