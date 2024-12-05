module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: "30",
          },
          useBuiltIns: "usage",
          corejs: "3.6",
        },
      ],
    ],

    plugins: ["@babel/plugin-transform-runtime", testPlugin],

    ignore: ["src/only/ignore.js"],

    // only: ["src/only"],

    sourceMaps: "inline", // "both" | "inline" | "both" | "false"
  };
};

function testPlugin() {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          // console.log("start processing this module...");
        },
        exit(path, state) {
          // console.log("end processing this module!");
        },
      },
      VariableDeclaration(path, state) {
        // console.log("processing ImportDeclaration...");
        if (path.get("kind").node !== "let") return;
        path.node.kind = "var1";
      },
      ImportDeclaration(path, state) {
        const {
          opts: { libraryName, alias },
        } = state;

        console.log("start processing ImportDeclaration..." + libraryName);

        // 判断如果不是我们的指定的包名就return 不用处理
        if (!types.isStringLiteral(path.node.source, { value: libraryName }))
          return;

        // 匹配到我们的包名，做自己的逻辑：替换节点
        // 生成节点
        const newImports = path.node.specifiers.map((item) => {
          return types.importDeclaration(
            [types.importDefaultSpecifier(item.local)],
            types.stringLiteral(`${alias}/${item.local.name}`)
          );
        });

        // 替换节点
        path.replaceWithMultiple(newImports);
      },
      ImportDeclaration: {
        enter(path, state) {
          // console.log("start processing ImportDeclaration...");
          // do something
        },
        exit(path, state) {
          // console.log("end processing ImportDeclaration!");
          // do something
        },
      },
    },
  };
}
