const rewireTypescript = require('react-app-rewire-typescript');

module.exports = function override(config, env) {
  // use any rewires here ;-) You are welcome!

  return rewireTypescript(config, env);
}
