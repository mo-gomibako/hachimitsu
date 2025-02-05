import { FlatCompat } from "@eslint/eslintrc";
import jsPlugin from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";
import tsPlugin from "typescript-eslint";

const compat = new FlatCompat({});

const JS_TS_FILES = [
  "**/*.js",
  "**/*.*js",
  "**/*.jsx",
  "**/*.ts",
  "**/*.mts",
  "**/*.tsx",
];

const jsConfigs = tsPlugin.config(jsPlugin.configs.recommended, {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text", "useColorScheme"],
            message: "Please use '@/components' or 'nativewind' instead.",
          },
        ],
      },
    ],
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
});
const tsConfigs = tsPlugin.config(
  // eslint-disable-next-line import/no-named-as-default-member
  tsPlugin.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
const tailwindcssConfigs = tsPlugin.config(
  tailwindcssPlugin.configs["flat/recommended"],
);
const expoConfigs = tsPlugin.config(
  compat.extends("expo"),
  importPlugin.flatConfigs.typescript,
  {
    files: JS_TS_FILES,
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
  },
);
const unusedImportsConfigs = tsPlugin.config({
  files: JS_TS_FILES,
  plugins: {
    "unused-imports": unusedImportsPlugin,
  },
  rules: {
    "unused-imports/no-unused-imports": "error",
  },
});

export default tsPlugin.config(
  jsConfigs,
  tsConfigs,
  tailwindcssConfigs,
  expoConfigs,
  unusedImportsConfigs,
  // expoではlocal assetsを読み込むときにrequireを使っている
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // unused-imports/no-unused-varsを利用し、その他のno-unused-varsの設定はoffにする
  {
    rules: {
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  { ignores: ["drizzle"] },
);
