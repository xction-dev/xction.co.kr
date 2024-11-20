const path = require("node:path");
/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../"),
    externalDir: true,
  },
};
