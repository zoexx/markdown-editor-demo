let webpack = require('webpack');
 
 module.exports = {
     entry: './src/markdownit.js',
     output: {
         path: './dist',
         filename: 'markdownit.js'
     } ,
     module: {
         loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
             } ,
             {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'raw-loader!inline-style-loader!autoprefixer-loader?{browsers: ["last 2 version"]}'
             } ,
             {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
             }
         ]
     } ,

     plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
     ]

 };