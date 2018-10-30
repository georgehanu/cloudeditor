//.replace(/^\//, ''); into node_modules\laravel-mix\src\builder\Entry.js
const startEditor = require("./Editor");

const EDITOR_WORKSPACE = process.env.MIX_EDITOR_WORKSPACE;

startEditor("root", EDITOR_WORKSPACE);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
