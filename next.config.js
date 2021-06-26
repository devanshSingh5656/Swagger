module.exports = {
  env: {
    mongodburl:
      "mongodb+srv://devanshsingh18:devanshsingh18@cluster0.qiutz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    SECRET: "asdasdfdjfalkjewjifjvklslkdflsdkjfalkjdlfkqwjoi",
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
};
