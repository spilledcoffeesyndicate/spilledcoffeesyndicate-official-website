import { defineConfig } from 'eslint/config'
import eslintPlugin from '@eslint/js'
import { configs as tseslintConfigs } from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'

const ignoresConfig = defineConfig([
    {
        name: 'project/ignores',
        ignores: [
            '.next/',
            'node_modules/',
            'public/',
            '.vscode/',
            'next-env.d.ts',
            'out/',
        ]
    },
])

const eslintConfig = defineConfig([
    {
        name: 'project/javascript-recommended',
        files: ['**/*.{js,mjs,ts,tsx}'],
        ...eslintPlugin.configs.recommended,
    },
])

const typescriptConfig = defineConfig([
    {
        name: 'project/typescript-recommended',
        files: ['**/*.{ts,tsx}'],
        extends: [
            ...tseslintConfigs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
])

const nodeCommonJsConfig = defineConfig([
    {
        name: 'project/node-commonjs',
        files: [
            'next.config.js',
            'postcss.config.js',
            'tailwind.config.js',
            'scripts/**/*.js',
        ],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
                process: 'readonly',
                console: 'readonly',
            },
        },
    },
])

const reactConfig = defineConfig([
    {
        name: 'project/react-next',
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            '@next/next': nextPlugin,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...reactHooksPlugin.configs['recommended-latest'].rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    }
])

export default defineConfig([
    ...ignoresConfig,
    ...eslintConfig,
    ...typescriptConfig,
    ...nodeCommonJsConfig,
    ...reactConfig,
])
