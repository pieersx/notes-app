import js from '@eslint/js'
import cypress from 'eslint-plugin-cypress'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  // Ignorar archivos
  {
    ignores: ['node_modules/', 'frontend/dist/', 'frontend/coverage/']
  },

  // Configuración base para JavaScript
  js.configs.recommended,

  // Backend (Node.js + CommonJS)
  {
    files: ['backend/**/*.{js,cjs,mjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },

  // Frontend (React + ES Modules)
  {
    files: ['frontend/src/**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        vi: 'readonly', // Para Vitest
        test: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly'
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // No necesario en React 17+
      'react/prop-types': 'off', // Desactivar temporalmente
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  },

  // Cypress config file
  {
    files: ['frontend/cypress.config.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Cypress (E2E testing)
  {
    files: ['frontend/cypress/**/*.{js,jsx}'],
    plugins: {
      cypress
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    }
  }
]
