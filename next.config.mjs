/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            },
            {
                protocol: "https",
                hostname: "utfs.io"
            },
            {
                protocol: "https",
                hostname: "pbs.twimg.com"
            },
            {
                protocol: "https",
                hostname: "img.daisyui.com"
            }

        ]
    }
};


export default nextConfig;
