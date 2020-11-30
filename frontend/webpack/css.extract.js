const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: {
                            loader: 'css-loader'
                        }
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                allChunks: true,
                filename: './css/styles.css'
            })
        ]
    };
};
