module.exports = {
    plugins: [
        require('autoprefixer') ,
        require('postcss-assets')({
            relative : true ,
            loadPaths: ['img/']
        })
    ]
}