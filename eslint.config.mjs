import { FlatCompat } from "@eslint/eslintrc";
import jsPlugin from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
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

export default tsPlugin.config(
  jsConfigs,
  tsConfigs,
  tailwindcssConfigs,
  expoConfigs,
  // expoではlocal assetsを読み込むときにrequireを使っている
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
