module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@next/next/recommended",
    "prettier",
    "plugin:import/typescript",
  ],
  globals: {
    React: "readonly", // React >=17
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Disallow imports from src/server/ in src/pages/ except for src/pages/api
    // (see the "overrides" section for the exception)
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/pages",
            from: "./src/server",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["next.config.js", "scripts/**/*.ts"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      // Allow imports from src/server/ in src/pages/api
      files: ["src/pages/api/**/*"],
      rules: {
        "import/no-restricted-paths": [
          "error",
          {
            zones: [
              {
                target: "./src/pages/api",
                from: "./src/client/",
              },
            ],
          },
        ],
      },
    },
  ],
};
