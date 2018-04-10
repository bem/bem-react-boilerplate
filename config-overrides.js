const rewirePlatformBundles = require('./tools/rewirePlatformBundles');

module.exports = function override(config, env) {
  // use any rewires here ;-) You are welcome!

  // TODO:
  // 1. Do we need support env? Now it works fine in DEV and PROD
  // 2. Change current platform by process.env.PLATFORM
  return rewirePlatformBundles({
    techs: ['js', 'css'],
    platforms: ['desktop', 'touch']
  })(config, env);
}
