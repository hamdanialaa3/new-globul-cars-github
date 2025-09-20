module.exports = {
  babel: {
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
          fileName: false,
          ssr: true,
          minify: true,
          transpileTemplateLiterals: true,
          pure: true,
        },
      ],
    ],
  },
};