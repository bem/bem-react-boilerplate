const rewireTypescript = require('react-app-rewire-typescript');
const rewireEntry = require('rewire-entry')({
  entry: ['index.tsx', 'admin.tsx']
});

module.exports = {
  webpack: (config, env) => {
    config = rewireTypescript(config, env);
    config = rewireEntry.webpack(config, env);

    return config;
  },
  devServer: (config, env) => {
    config = rewireEntry.devServer(config, env);

    return config;
  }
};
