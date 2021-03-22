export default async function handler(req, res) {
  const { youtubeURL } = req.query;
  res.json(req.query);
}
