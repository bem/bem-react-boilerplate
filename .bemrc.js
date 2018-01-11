module.exports = {
    levels: {
        'src/blocks': { scheme: 'nested' }
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
