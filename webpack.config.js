const path = require("path");

module.exports = {
  entry : [
    "./js/util.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/map.js",
    "./js/card.js",
    "./js/synchronize-fields.js",
    "./js/form.js",
    "./js/templatesErrorSuccess.js",
    "./js/backend.js",
    "./js/image-upload.js",
    "./js/pin.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
