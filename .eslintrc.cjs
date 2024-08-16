module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended', // 新增
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks', // 新增
    '@typescript-eslint',
    'jsx-a11y', // 新增
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'quotes': ['error', 'single'], // 强制使用单引号
    'semi': ['error', 'always'], // 强制使用分号
    '@typescript-eslint/no-unused-vars': 'error', // 避免未使用的变量
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要在作用域内使用 React
    'react/jsx-uses-react': 'off', // React 17+ 不需要在 JSX 文件中显式引用 React
    'react/jsx-uses-vars': 'error', // 防止变量被错误地标记为未使用
    'react/jsx-indent': ['error', 2], // 强制使用 2 个空格的缩进
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // 强制 JSX 闭合标签的位置
  },
};
