import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.mjs',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'ATrieGrowsInJS',
    },
  },
  {
    input: 'src/index.mjs',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'ATrieGrowsInJS',
      plugins: [terser()],
    },
  },
];
