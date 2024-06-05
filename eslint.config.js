import globals from "globals";
import pluginJs from "@eslint/js";

export default [

  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },

  {
    languageOptions: {

      // ecmaVersion: 2020,
      globals: {
        'IS_DEVELOPMENT': 'readonly',
        ...globals.browser, ...globals.node
      },
      sourceType:'module'
    }
  },
  pluginJs.configs.recommended,

]
