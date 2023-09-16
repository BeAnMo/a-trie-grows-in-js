const terser = require('@rollup/plugin-terser');

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'ATrieGrowsInJS',
    },
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'ATrieGrowsInJS',
      plugins: [terser()],
    },
  },
];
