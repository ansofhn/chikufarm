const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["https://chikufarm-app.herokuapp.com/"],
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

module.exports = nextConfig;
