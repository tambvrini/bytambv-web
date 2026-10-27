// Live numbers for bytambv.com. Vercel serverless function.
// Needs env var YOUTUBE_API_KEY (YouTube Data API v3). Cached at the edge for 24h.
const VIDEOS = ['b7Q6FWaLPWg', 'RX7UUcbB6rE', 'pBTnjICATt8', 'Rw9RxRElJAU', 'Zw3WfPCBSXk', 'OqTtsEaMvg8', 'iCjTMngRDJw', 'xSDp29Fx2yg'];
const HANDLE = 'TAMBV';

const dur = iso => { const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) || []; const h = +m[1] || 0, mi = +m[2] || 0, s = +m[3] || 0; return (h ? h + ':' + String(mi).padStart(2, '0') : mi) + ':' + String(s).padStart(2, '0'); };

module.exports = async (req, res) => {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) { res.status(503).json({ error: 'YOUTUBE_API_KEY not set' }); return; }
  try {
    const base = 'https://www.googleapis.com/youtube/v3';
    const [ch, vi] = await Promise.all([
      fetch(`${base}/channels?part=statistics&forHandle=${HANDLE}&key=${key}`).then(r => r.json()),
      fetch(`${base}/videos?part=statistics,contentDetails,snippet&id=${VIDEOS.join(',')}&key=${key}`).then(r => r.json()),
    ]);
    const cs = ch.items && ch.items[0] && ch.items[0].statistics;
    const videos = {};
    (vi.items || []).forEach(v => { videos[v.id] = { views: +v.statistics.viewCount, likes: +v.statistics.likeCount || 0, duration: dur(v.contentDetails.duration), published: v.snippet.publishedAt }; });
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=86400');
    res.status(200).json({ updated: new Date().toISOString(), channel: cs ? { subscribers: +cs.subscriberCount, views: +cs.viewCount } : null, videos });
  } catch (e) { res.status(500).json({ error: 'fetch failed' }); }
};
