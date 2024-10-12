import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import storybookPlugin from 'eslint-plugin-storybook';

export default [
  js.configs.recommended,
  ...nextPlugin.configs['core-web-vitals'],
  ...storybookPlugin.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      // You can add your custom rules here
    },
  },
];