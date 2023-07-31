/* Import Required Modules */
const express = require("express");
const router = express.Router();
const xml = require("xml");
const fs = require("fs");
const path = require("path");

// Synchronously read file contents
/* Parse specfic key json */
const sitemapData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/sitemapData.json"), "utf8")
);

const getUrls = async () => {
  const urls = [...sitemapData.staticUrls];
  for (const model of sitemapData.dynamicUrls.models) {
    const Model = require("../models/" + model);
    const data = await Model.find({});

    const dataUrls = data.map((item) => {
      const sitemap = JSON.parse(item.body).sitemap;
      return {
        ...sitemap,
      };
    });

    urls.push(...dataUrls);
  }

  return urls;
};

/* GET sitemap.xml. */
router.get("/sitemap.xml", async (req, res) => {
  const urls = await getUrls();

  const sitemap = [
    { _attr: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" } },
    ...urls.map((url) => ({
      url: [
        { loc: url.loc },
        { lastmod: new Date(url.lastmod).toISOString().split("T")[0] },
        { changefreq: url.changefreq },
        { priority: url.priority },
      ],
    })),
  ];

  res.header("Content-Type", "application/xml");
  res.send(xml({ urlset: sitemap }, { declaration: true }));
});

module.exports = router;
