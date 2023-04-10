const runner = require("@bomon/webpack-runner").runner;

runner({
  type: "react",
  chainWebpack(config) {
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.merge({ devtool: "source-map" });
    });
  },
});
