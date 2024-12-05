const babel = require("@babel/core");

const result = babel.transformSync("const fn = () => 1", {
  plugins: ["@babel/plugin-transform-arrow-functions"],
});

console.log(result.code);
