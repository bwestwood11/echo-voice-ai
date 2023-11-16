/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    }),
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false
    })
    )
    return config;
  },
  
};

module.exports = nextConfig;
