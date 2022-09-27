Object.keys(require.cache)
  .filter((key) => !key.includes("node_modules"))
  .forEach((key) => {
    delete require.cache[key];
  });

/* eslint-disable */
module.exports = require("@boost/module").requireModule(
  require.resolve("./schema.ts")
);