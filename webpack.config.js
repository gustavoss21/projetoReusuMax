module.exports = {
    entry: './core/static/js/execultor.js',
    output: {
        path: __dirname + '/core/static/js/',
        filename:'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                }
            }
        ]
    }
}