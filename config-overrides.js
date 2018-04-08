const path = require('path');

module.exports = function override(config, env) {
  // Add bem-loader in Babel scope
  const babelLoader = config.module.rules[1].oneOf[1];

  config.module.rules[1].oneOf[1] = {
    test: babelLoader.test,
    include: [
      path.resolve('node_modules', 'bem-react-components', 'blocks'),
      babelLoader.include
    ],
    use: [
      {
        loader: require.resolve('webpack-bem-loader'),
        options: {
          techs: ['js', 'css']
        }
      },
      {
        loader: babelLoader.loader,
        options: Object.assign({}, babelLoader.options, {
          presets: [['es2015', { loose: true }], 'react'],
          plugins: ['transform-object-rest-spread']
        })
      }
    ]
  };

  return config;
}
