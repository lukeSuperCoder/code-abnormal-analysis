// 引入等比适配插件
const px2rem = require("postcss-px2rem");

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16,
});
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const webpack = require("webpack");
module.exports = {
  // 公共路径(必须有的)
  publicPath: "./",
  // 输出文件目录
  outputDir: "commonTemplate",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave: false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: false, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "基础通用前端框架";
      return args;
    });
  },
  configureWebpack: (config) => {
    // config.entry.app = ["@babel/polyfill","./src/main.js"];
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.resolve = {
      // 别名配置
      alias: {
        src: "@", //默认已配置
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        views: "@/views",
        plugins: "@/plugins",
        utils: "@/utils",
      },
    };
  },
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [postcss],
      },
    },
  },
  devServer: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            pathRewrite:{'^/api':''},
            ws: true,
            changeOrigin: true
          }
      }
  }
};
