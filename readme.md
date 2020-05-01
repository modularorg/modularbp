<p align="center">
    <a href="https://github.com/modularbp/modular-boilerplate">
        <img src="https://user-images.githubusercontent.com/4596862/37635200-aa3271b2-2bd0-11e8-8a65-9cafa0addd67.png" height="140">
    </a>
</p>
<h1 align="center">modularBP</h1>
<p align="center">Dead simple modular boilerplate.</p>

## Installation
```sh
npm install mbp -g
```

## Usage
```sh
# init your project
mbp init

# run the build system you chose
gulp
```

## Modules

### Build
| Module | Description |
| ------ | ----------- |
| [modularbp-gulp] | Build tasks modules with [gulp] |

### Styles
| Module | Description |
| ------ | ----------- |
| [modularbp-css] | CSS modules with [cssnext] and [PostCSS] |
| [modularbp-sass] | SCSS modules with [Sass] |
| [modularbp-less] | LESS modules with [Less] |

### Scripts
| Module | Description |
| ------ | ----------- |
| [modularbp-mjs] | JavaScript modules with [modularJS] and [Babel] |
| [modularbp-js] | JavaScript modules with [Babel] |

### Views
| Module | Description |
| ------ | ----------- |
| [modularbp-hbs] | HTML modules with [Handlebars] |
| [modularbp-liquid] | HTML modules with [Liquid] |
| [modularbp-swig] | HTML modules with [Swig] |

## Customization

### Base

If you want to further customize the boilerplate to your own structure and files, you can easily clone a GitHub repository with the init command, by specifying the repository name and optionally the destination directory. It will clone first, then install the mbp modules without overwriting your files.

```sh
mbp init <user/repo> <dir>
```

### Config

You can create a `mconfig.json` file to change the default folders structure and set your modules choice to skip the cli questions.

```json
{
  "src": "./src/",
  "dest": "./dist/",
  "build": "./build/",
  "styles": {
    "src": "./src/styles/",
    "dest": "./dist/styles/",
    "main": "main"
  },
  "scripts": {
    "src": "./src/scripts/",
    "dest": "./dist/scripts/",
    "main": "main"
  },
  "svgs": {
    "src": "./src/images/sprite/",
    "dest": "./dist/images/"
  },
  "views": {
    "src": "./src/",
    "partials": "./src/partials/"
  },
  "modules": {
    "build": "gulp",
    "style": "css",
    "script": "mjs",
    "view": "hbs"
  }
}
```

[modularbp-gulp]: https://github.com/modularorg/modularbp-gulp
[modularbp-css]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-css
[modularbp-sass]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-sass
[modularbp-less]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-less
[modularbp-mjs]: https://github.com/modularorg/modularbp-mjs
[modularbp-js]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-js
[modularbp-hbs]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-hbs
[modularbp-liquid]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-liquid
[modularbp-swig]: https://github.com/modularorg/modularbp-gulp/tree/master/modules/gulp-swig

[gulp]: https://github.com/gulpjs/gulp
[cssnext]: https://github.com/MoOx/postcss-cssnext
[Sass]: https://github.com/sass/libsass
[Less]: https://github.com/less/less.js
[PostCSS]: https://github.com/postcss/postcss
[modularJS]: https://github.com/modularorg/modularjs
[Babel]: https://github.com/babel/babel
[Handlebars]: https://github.com/wycats/handlebars.js
[Liquid]: https://github.com/Shopify/liquid
[Swig]: https://github.com/node-swig/swig-templates
