const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
require('ts-node/register');
module.exports = require('./metro.config.ts');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./styles/global.css" });