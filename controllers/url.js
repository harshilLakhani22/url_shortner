const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const _shortId = shortid();
  await URL.create({
    shortId: _shortId,
    redirectURL: body.url, // Corrected access to the URL value
    visitHistory: [],
  });

  return res.render("home", {
    id: _shortId 
  });
}


async function handelGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handelGetAnalytics,
};
