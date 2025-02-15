/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://adol.tech",
  generateRobotsTxt: true,
  outDir: "out",
};
