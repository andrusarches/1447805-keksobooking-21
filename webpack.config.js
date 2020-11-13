const path = require("path");

module.exports = {
  entry : [
    "./js/util.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/load.js",
    "./js/map.js",
    "./js/card.js",
    "./js/form.js",
    "./js/image-upload.js",
    "./js/pin.js",
    "./js/upload.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
