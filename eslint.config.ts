import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import { defineFlatConfig } from 'eslint-define-config'
import * as parserTypeScript from '@typescript-eslint/parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ['dist/**', 'node_modules/**']
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
])