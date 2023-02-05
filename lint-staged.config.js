module.exports = {
  '*.{js,jsx,json}': ['prettier --write'],
  '*.{ts,tsx}': [
    () => 'tsc --noEmit --skipLibCheck --jsx react-native',
    'organize-imports-cli',
    'eslint --fix',
    'prettier --write',
  ],
};
