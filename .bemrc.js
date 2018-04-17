module.exports = {
  levels: [
    {
      layer: 'common',
      path: 'src/blocks'
    },
    {
      layer: 'desktop',
      path: 'src/desktop'
    },
    {
      layer: 'touch',
      path: 'src/touch'
    }
  ].map(level => Object.assign({
    schemeOptions : 'react',
    naming : 'react',
    scheme: 'nested' }, level)
  ),
  // remove sets to build one universal bundle for index.html
  sets: {
    desktop: 'common desktop',
    touch: 'common touch'
  },
  modules: {
    'bem-tools': {
      plugins: {
        create: {
          levels: {
            'src/blocks': { default: true }
          },
          techs: ['js', 'css'],
          templates: {
            js: '.bem/templates/js.js'
          }
        }
      }
    }
  }
}
