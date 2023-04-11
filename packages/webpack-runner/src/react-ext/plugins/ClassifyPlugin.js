// 负责分类js，执行不同的写入manifest逻辑
const path = require("path");

const defaultOption = {
  path: path.join(process.cwd(), "manifest.json"),
};

module.exports = class ClassifyPlugin {
  option = defaultOption;
  constructor(option) {
    Object.assign(this.option, option);
  }
  apply(compiler) {}
};
