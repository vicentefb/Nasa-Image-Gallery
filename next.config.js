module.exports = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: ["images-assets.nasa.gov", "apod.nasa.gov", "epic.gsfc.nasa.gov"], // to optimze the images that come from this domain
    path: "/_next/image",
    loader: "default",
  },
};
