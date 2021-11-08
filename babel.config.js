"use strict";
/**
babel.config.js with useful plugins. 
*/
module.exports = function (api) {
  api.cache(true);
  api.assertVersion("^7.4.5");

  const presets = [
    ["@babel/preset-env"],
    ["@babel/preset-react", {"runtime": "automatic"}],
    ["@babel/preset-typescript"]
  ];
  const plugins = [
    ["@babel/plugin-syntax-jsx"],
    ["@babel/plugin-proposal-class-properties"],
  ];

  return {
    presets,
    plugins,
  };
};
