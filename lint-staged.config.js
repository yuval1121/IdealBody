module.exports = {
  '*.{js,jsx,json}': ['prettier --write'],
  '*.{ts,tsx}': [
    () => 'tsc --noEmit --skipLibCheck --jsx react-native',
    'eslint --fix',
    'organize-imports-cli',
    'prettier --write',
  ],
};
