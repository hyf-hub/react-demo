module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 增加node环境，否则在别的文件中使用node的东西会报错
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier", // eslint-config-prettier 可简写成 prettier
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "./index.html"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "./index.html"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  // eslint-plugin-prettier 可简写成 prettier
  plugins: ["@typescript-eslint", "prettier", "react-refresh","html"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "prettier/prettier": "error", // 开启规则
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
