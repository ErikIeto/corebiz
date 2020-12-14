module.exports = {
  parser: "postcss-scss",
  plugins: {
    "postcss-preset-env": {
      stage: 0,
      autoprefixer: {
        flexbox: "no-2009",
        grid: "autoplace",
      },
    },
  },
};
