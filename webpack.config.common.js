//Require path is a node subcomponent - no NPM modules needed
var path = require('path');
//This defines the build output - where the resultant HTML and JS code will be written
//This is what is read in by the browser
var BUILD_DIR = path.resolve(__dirname, 'build');
//This defines where the application source code is defined
var APP_DIR = path.resolve(__dirname, 'src');

const webpack = require('webpack');


//This defines what the webpack config actually is
module.exports = {
    //The point in which webpack assume the application to enter. Analogous to main() in c++
    entry: APP_DIR + '/index.tsx',
    //Where webpack outputs it. Analogous to your build/ dir for a CMake project
    output: {
        path: BUILD_DIR,
        filename: "module.bundle.js",
        publicPath: "/build/"
    },

    devServer: {
        hot: true
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};