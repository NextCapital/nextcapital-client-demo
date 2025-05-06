const babelParser = require('@babel/eslint-parser');

const baseConfig = require('@nextcapital/eslint-config');
const jsdocConfig = require('@nextcapital/eslint-config/jsdoc');
const reactConfig = require('@nextcapital/eslint-config/react');

module.exports = [
  ...baseConfig,
  ...jsdocConfig,
  ...reactConfig,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2016,
        sourceType: 'module',

        requireConfigFile: false
      },
      globals: {
        'NC_ENV': true,
        'SOLUTION_ID': true
      }
    },
    settings: {
      react: {
        version: 'detect',
        defaultVersion: '18.2'
      }
    }
  },
  {
    rules: {
      '@stylistic/jsx-props-no-multi-spaces': 'off',

      'class-methods-use-this': 'off',

      'import/no-extraneous-dependencies': 'off',

      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',

      'react/no-array-index-key': 'off',
      'react/jsx-fragments': ['error', 'element'],
      'react/sort-comp': 'off',
      'react/prop-types': 'off',

      'no-console': 'off',
      'no-alert': 'off'
    }
  },
  {
    files: [
      'js/**/*.jsx'
    ],
    ignores: [
      'js/**/*.test.jsx',
    ],
    rules: {
      'prefer-arrow-callback': ['error', {
        allowNamedFunctions: true
      }]
    }
  },
  {
    files: [
      'js/**/*.test.*'
    ],
    rules: {
      'react/jsx-props-no-spreading': 'off'
    }
  }
];
