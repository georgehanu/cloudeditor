let mix = require("laravel-mix");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const EDITOR_WORKSPACE = process.env.MIX_EDITOR_WORKSPACE || "admin";
const cssFilename = "[name].css";
const editorPublicPath = "editor/" + EDITOR_WORKSPACE + "/";

/* Load Theme files */
var path = require("path");
const themeFiles = require("./resources/editor/workspaces/" +
  EDITOR_WORKSPACE +
  "/theme");
let selectedTheme = process.env.THEME || "default";
let includeFiles = themeFiles.Themes[selectedTheme].map(el => {
  return path.resolve(__dirname, "resources/editor/themes/" + el);
});
console.log(includeFiles);

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [], // For newer versions,
        include: includeFiles,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
                // modules: true,
                // localIdentName: "[name]__[local]__[hash:base64:5]"
              }
            },
            {
              loader: "sass-loader",
              options: {
                outputStyle: "expanded",
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        // only include svg that doesn't have font in the path or file name by using negative lookahead
        test: /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
        loaders: [
          {
            loader: "file-loader",
            options: {
              name: path => {
                if (!/node_modules|bower_components/.test(path)) {
                  console.log(path);
                  const tmp = path.split("resources\\editor\\");
                  const newPath = tmp[1].replace(/\\/g, "/");
                  return editorPublicPath + newPath + "?[hash]";
                }

                return (
                  editorPublicPath +
                  "/vendor/" +
                  path
                    .replace(/\\/g, "/")
                    .replace(
                      /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                      ""
                    ) +
                  "?[hash]"
                );
              },
              publicPath: "/"
            }
          },

          {
            loader: "img-loader",
            options: Config.imgLoaderOptions
          }
        ]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: cssFilename
    })
  ],
  devtool: "source-map"
});

mix.autoload({
  jquery: ["$", "window.jQuery", "jQuery"]
});

//mix.copy("resources/editor/assets", "public/" + editorPublicPath + "assets");
mix.copy("resources/editor/locales", "public/" + editorPublicPath + "locales");
// for assets
for (let plugin in themeFiles.PluginAssets) {
  mix.copy(
    "resources/editor/assets/" +
      selectedTheme +
      "/" +
      themeFiles.PluginAssets[plugin] +
      "/",
    "public/" + editorPublicPath + "assets"
  );
}
mix.disableNotifications();

mix.react(
  "resources/editor/index.js",
  "public/editor/" + EDITOR_WORKSPACE + "/index.js"
);

mix.setPublicPath("public");
