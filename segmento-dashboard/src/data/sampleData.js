// All values on this page are SAMPLE / DEMO data only.
// Nothing here comes from a real API, scraper, or database yet.

export const kpiData = [
  {
    id: 'mentions',
    label: 'Total Mentions',
    value: '124,532',
    change: '+23%',
    trend: 'up',
    icon: 'MessageSquare',
  },
  {
    id: 'sentiment',
    label: 'Positive Sentiment',
    value: '68%',
    change: '+12%',
    trend: 'up',
    icon: 'Smile',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    value: '4.8M',
    change: '+34%',
    trend: 'up',
    icon: 'Heart',
  },
  {
    id: 'alerts',
    label: 'Active Alerts',
    value: '5',
    change: '+67%',
    trend: 'up',
    icon: 'AlertTriangle',
  },
]

export const mentionTrendData = [
  { date: 'Sep 14', mentions: 5000 },
  { date: 'Sep 15', mentions: 6200 },
  { date: 'Sep 16', mentions: 8200 },
  { date: 'Sep 17', mentions: 11000 },
  { date: 'Sep 18', mentions: 13400 },
  { date: 'Sep 19', mentions: 12500 },
  { date: 'Sep 20', mentions: 9300 },
  { date: 'Sep 21', mentions: 11200 },
]

export const sentimentData = [
  { name: 'Positive', value: 68, color: '#1AA36B' },
  { name: 'Neutral', value: 22, color: '#E0A429' },
  { name: 'Negative', value: 10, color: '#E5484D' },
]

export const topTopics = [
  { topic: 'Delivery', mentions: 39842, percent: 32 },
  { topic: 'Pricing', mentions: 26118, percent: 21 },
  { topic: 'Product', mentions: 22351, percent: 18 },
  { topic: 'Customer Support', mentions: 13692, percent: 11 },
  { topic: 'Refunds', mentions: 9430, percent: 8 },
  { topic: 'Returns', mentions: 5921, percent: 5 },
]

export const topMentions = [
  {
    id: 1,
    username: '@techlover23',
    platform: 'Twitter',
    text: 'Product X is amazing! Fast delivery and great quality.',
    sentiment: 'Positive',
    engagement: '2.4K',
  },
  {
    id: 2,
    username: '@jessica.r',
    platform: 'Instagram',
    text: 'Still waiting for my order. It has been 2 weeks.',
    sentiment: 'Negative',
    engagement: '1.2K',
  },
  {
    id: 3,
    username: '@marcus_dev',
    platform: 'Twitter',
    text: 'Customer support resolved my issue in minutes. Impressed.',
    sentiment: 'Positive',
    engagement: '980',
  },
  {
    id: 4,
    username: '@priya.k',
    platform: 'Facebook',
    text: 'Pricing went up again this month. Not happy about it.',
    sentiment: 'Negative',
    engagement: '1.6K',
  },
  {
    id: 5,
    username: '@dan_reviews',
    platform: 'Instagram',
    text: 'Packaging could be better, but the product itself works well.',
    sentiment: 'Neutral',
    engagement: '540',
  },
]

export const emergingTopics = [
  { topic: 'Delivery delays', change: '+184%' },
  { topic: 'Refund complaints', change: '+97%' },
  { topic: 'Product update', change: '+56%' },
  { topic: 'Shipping costs', change: '+43%' },
  { topic: 'Feature requests', change: '+32%' },
]

export const initialQueries = [
  {
    id: 1,
    name: 'Brand Health',
    mentions: '12,432',
    status: 'Active',
    created: 'Sep 02, 2026',
  },
  {
    id: 2,
    name: 'Competitor Monitoring',
    mentions: '8,921',
    status: 'Active',
    created: 'Sep 05, 2026',
  },
  {
    id: 3,
    name: 'Product X Complaints',
    mentions: '6,342',
    status: 'Active',
    created: 'Sep 10, 2026',
  },
  {
    id: 4,
    name: 'Campaign Performance',
    mentions: '4,893',
    status: 'Paused',
    created: 'Sep 12, 2026',
  },
]

export const sourceOptions = ['All Sources', 'Twitter', 'Instagram', 'Facebook', 'News', 'Forums']
export const sentimentOptions = ['All Sentiment', 'Positive', 'Neutral', 'Negative']
export const languageOptions = ['English', 'Spanish', 'French', 'German', 'Hindi']
