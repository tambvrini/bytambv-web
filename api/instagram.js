// Live Instagram follower count for the professional account.
// Configure INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in Vercel.
module.exports = async (req, res) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return res.status(503).json({ error: 'Instagram API not configured' });
  try {
    const version = process.env.META_GRAPH_VERSION || 'v24.0';
    const url = `https://graph.facebook.com/${version}/${encodeURIComponent(userId)}?fields=followers_count&access_token=${encodeURIComponent(token)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || typeof data.followers_count !== 'number') throw new Error('Instagram response invalid');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=86400');
    return res.status(200).json({ followers: data.followers_count, updated: new Date().toISOString() });
  } catch (e) {
    return res.status(502).json({ error: 'Instagram fetch failed' });
  }
};
