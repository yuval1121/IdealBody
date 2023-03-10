module.exports = {
  '*.{js,jsx,json}': ['prettier --write'],
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
};
