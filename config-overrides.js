const rewireBemSets = require('rewire-bem-sets');

module.exports = function override(config, env) {
  // use any rewires here ;-) You are welcome!

  return rewireBemSets({
    techs: ['js', 'css']
  })(config, env);
}
