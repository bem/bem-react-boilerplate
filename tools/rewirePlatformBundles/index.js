// FIXME: move out to npm package

const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bemConfig = require('@bem/sdk.config')();

// Please don't use this hack in real life ;-)
const overrideReporter = require('./overrideReporter');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const reporterFileId = require.resolve('react-dev-utils/FileSizeReporter');
require.cache[reporterFileId].exports = overrideReporter(FileSizeReporter);

const injectBemLoader = (config, options) => {
  const babelLoader = config.module.rules[1].oneOf[1];

  config.module.rules[1].oneOf[1] = {
    test: babelLoader.test,
    include: babelLoader.include,
    use: [
      {
        loader: require.resolve('webpack-bem-loader'),
        options
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

const statPath = (name, tech) => `static/${tech}/${name}.${tech}`;

// FIXME: webpack-bem-loader doesn't suppot arrays of objects
const convertLevels = levels => levels.reduce((acc, level) => {
  acc[level.path] = level;
  return acc;
}, {})

function createRewire(options) {
  const bundles = options.platforms.map(name => ({
    name,
    levels: bemConfig.levelsSync(name),
    static: {
      js: statPath(name, 'js'),
      css: statPath(name, 'css')
    }
  }));

  return function rewirePlatformBundles(config, env) {
    const isNotExtPlugin = plugin => !(plugin instanceof ExtractTextPlugin);

    const configsByPlatform = bundles.map(bundle => {
      const platformConfig = merge.strategy({
        plugins: 'replace'
      })(config, {
        output: {
          filename: bundle.static.js
        },
        plugins: [].concat(config.plugins.filter(isNotExtPlugin), [
          new ExtractTextPlugin({
            filename: bundle.static.css
          })
        ])
      });

      return injectBemLoader(platformConfig, Object.assign({}, options, {
        levels: convertLevels(bundle.levels)
      }));
    });

    // patch result array for react-script compatibility
    // it expects object with output info for logging
    configsByPlatform.output = {
      publicPath: config.output.publicPath
    };

    return configsByPlatform;
  }
}

module.exports = createRewire;
