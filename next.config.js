const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // async headers() {
    //     return [
    //         {
    //             source: "/:path*",
    //             headers:[
    //                 {key: "access-control-allow-credentials", value: "true"},
    //                 {key: "access-control-allow-origin", value: "*"},
    //                 {key: "access-control-allow-methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"},
    //                 {key: "access-control-allow-headers", value: "X-CSRF-Token, X-Requested-With, Content-Type, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, Authorization"},
    //             ],
    //             // destination: "https://474f-180-244-211-44.ap.ngrok.io/:path*",
    //         },
    //     ];
    // },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

module.exports = nextConfig;
