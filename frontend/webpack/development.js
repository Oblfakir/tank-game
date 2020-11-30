const merge = require('webpack-merge');
const css = require('./css');

module.exports = function () {
    return merge([
        {
            mode: 'development',
            devServer: {
                port: 3000
            }
        },
        css()
    ]);
};
