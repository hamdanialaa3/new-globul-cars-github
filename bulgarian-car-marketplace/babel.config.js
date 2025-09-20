module.exports = {
  presets: [
    [
      'react-app',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: false,
        ssr: false,
        minify: true,
        transpileTemplateLiterals: true,
        pure: true,
      },
    ],
  ],
};