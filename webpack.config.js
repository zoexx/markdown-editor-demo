let webpack = require('webpack');
 
 module.exports = {
     entry: __dirname + '/src/markdownit.js',
     output: {
         path: __dirname +'/dist',
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
                loader: 'raw-loader!inline-style-loader!postcss-loader'
             } ,
             {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
             } ,
             {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' 
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