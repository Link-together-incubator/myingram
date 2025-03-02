import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Базовые правила Next.js
    "next/typescript", // Поддержка TypeScript
    "plugin:prettier/recommended", // Интеграция Prettier с ESLint
  ),
  {
    rules: {
      // Правила для React
      "react/jsx-uses-react": "error", // Проверка использования React в JSX
      "react/jsx-uses-vars": "error", // Проверка использования переменных в JSX
      "react/react-in-jsx-scope": "off", // Отключить требование импорта React в JSX (актуально для React 17+)

      // Правила для React Hooks
      "react-hooks/rules-of-hooks": "error", // Проверка правил использования хуков
      "react-hooks/exhaustive-deps": "warn", // Проверка зависимостей хуков

      // Правила для импортов
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always", // Добавлять пустые строки между группами импортов
        },
      ],

      // Правила для Prettier
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto", // решение проблемы с cr
        },
      ], // Ошибки, если код не соответствует правилам Prettier (Подумать, может быть отключить)
    },
  },
];

export default eslintConfig;
