const path = require("path");
// webpack dev server 모드에서, bundle은 메모리에서만 생성된다.
// 따라서 dist에 쓰여지지 않고, 이에 dist 폴더에 내용물이 없어서는 안되지는 않는다.
module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    // 마지막에 생성되는 단일 js 파일
    path: path.resolve(__dirname, "dist"),
    // tsconfig.json의 outDir 경로와 맞춰야 함
    publicPath: "dist",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      // 웹팩이 모든 파일에 적용될 규칙을 설정
      {
        test: /\.ts$/,
        // 규칙이 파일에 적용되는지 확인하기 위해 수행할 test. .ts로 끝나는 파일을 점검하도록 하는 정규표현식
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // 찾아야 할 파일
  },
};
