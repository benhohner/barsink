# Barsink

## Everything but the kitchen sink for your front-end

Barsink is a set of sane defaults for fast static frontend development. Heavily uses the Gulp.js streaming build system.

You can also use Gulp's live reload feature to see your changes almost instantly.

### Overview

*   Gulp.js
*   Jade
*   Stylus
*   Autoprefixer
*   Bower Support
*   CoffeeScript
*   Imagemin

### Usage

#### Set Up

0.  Node basics:

    1.  Install Node.js and NPM
    2.  If you try to install things and it asks you for admin access, try this `sudo chown -R $USER /usr/local/{share/man,bin,lib/node,include/node}`
    3.  Make sure Bower is installed globally `npm install -g bower`
1.  `npm install`
2.  `bower install`

#### Tasks

##### Development

Automatically start a static file server (default port `8080`) and livereload server (default port `35729`):

`gulp`

##### Deployment

Clean the build folder and deploy with minification and uglification (coming soon):

`gulp deploy`

or deploy raw:

`gulp deploy-raw`

#### Internals

##### Markup

`gulp markup`

1.  Jade
2.  HTML Minify (coming soon)

##### Styles

`gulp styles`

1.  Stylus
2.  Autoprefixer (`last 2, ie8, ios6, android4`)
3.  CSS Minify (coming soon)

##### Scripts

`gulp scripts`

1.  CoffeeLint (coming soon)
2.  CoffeeScript
3.  UglifyJS (coming soon)

##### Images

`gulp images`

1.  Imagemin

##### Bower

`gulp bower`

1.  Copy Bower files to `build/lib/`

##### Watch

`gulp watch`

1.  Watch scripts, styles, images, and markup folders for changes and rerun the respective task

##### Serve

`gulp serve`

1.  Start Connect static server (default port `8080`) at `build/`

##### LiveReload

`gulp livereload`

1.  Start LiveReload server (default port `35729`)

##### Clean
`gulp clean`

1.  Delete all the files in the `build/` folder

Crafted by Ben Hohner. Source under [MIT](http://opensource.org/licenses/MIT) licence.
