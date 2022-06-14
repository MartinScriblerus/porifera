// Webpack uses this to work with directories
const path = require('path');

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin its work
  entry: './web/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          module: true,
          import: {
            filter: (url, media, resourcePath) => {
              // resourcePath - path to css file

              // Don't handle `style.css` import
              if (url.includes("style.css")) {
                return false;
              }

              return true;
            },
          },
        },
      },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
            // Now we apply rule for images
            test: /\.(png|jpe?g|gif|svg|js)$/,
            use: [
                   {
                     // Using file-loader for these files
                     loader: "file-loader",
      
                     // In options we can set different things like format
                     // and directory to save
                     options: {
                       outputPath: 'images'
                     }
                   }
                 ]
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
              loader: 'url-loader',
            },
          },
    ]
    
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript 
  // minifying and other things, so let's set mode to development
  mode: 'development'
};