var fs = require('fs'),
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool:'inline-source-map',
    entry:
        [
            'webpack-dev-server/client/?http://127.0.0.1:8888',
            'webpack/hot/only-dev-server',
             './src/app.js',
            './src/print.js'
        ],
    output:{
        path:__dirname+'/public/js',
        filename:'[name].js',
        chunkFilename:'[id].chunk.js',
        publicPath:'http://127.0.0.1:8888/public/js'
    },
    resolve:{
        root:[process.cwd()+'/src', process.cwd() + '/node_modules'],
        extensions:['', '.js', '.css', '.scss', '.ejs', '.png', '.jpg']
    },
    module:{
      loaders:[
          {test:/\.js$/, exclude:/node_modules/,loader:'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'},
          {test:/\.css$/,loader:'style!css'},
          {test: /\.scss$/, loader: 'style!css!scss'},
          {
              test: /.*\.(gif|png|jpe?g|svg)$/i,
              loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
              ]
          }
      ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        //new webpack.optimize.CommonsChunkPlugin('shared.js'),
        //new webpack.DefinePlugin({
        //    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        //}),
        new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.HotModuleReplacementPlugin()
    ]

};
