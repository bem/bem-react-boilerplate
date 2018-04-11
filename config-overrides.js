const rewirePlatformBundles = require('./tools/rewirePlatformBundles');

module.exports = function override(config, env) {
  // use any rewires here ;-) You are welcome!

  return rewirePlatformBundles({
    techs: ['js', 'css']
  })(config, env);
}
