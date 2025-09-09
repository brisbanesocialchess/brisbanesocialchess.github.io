import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	{
		ignores: ['**/.wrangler/**', 'doc/', '_site/', '_deploy/', 'node_modules/'],
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			sourceType: 'module',
		},
		rules: {
			'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
		},
	},
	prettierConfig,
];
