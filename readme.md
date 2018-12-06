<p align="center">
    <a href="https://github.com/modularbp/modular-boilerplate">
        <img src="https://user-images.githubusercontent.com/4596862/37635200-aa3271b2-2bd0-11e8-8a65-9cafa0addd67.png" height="140">
    </a>
</p>
<h1 align="center">modularBP</h1>
<p align="center">A dead simple modular boilerplate.</p>

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
| [modular-gulp] | Build tasks modules with [gulp] |

### Styles
| Module | Description |
| ------ | ----------- |
| [modular-css] | CSS modules with [cssnext] and [PostCSS] |
| [modular-sass] | SCSS modules with [Sass] |

### Scripts
| Module | Description |
| ------ | ----------- |
| [modular-js] | JavaScript modules in ES6 with [Babel] |

### Views
| Module | Description |
| ------ | ----------- |
| [modular-hbs] | HTML modules with [Handlebars] |
| [modular-liquid] | HTML modules with [Liquid] |

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
    "script": "js",
    "view": "hbs"
  }
}
```

[modular-gulp]: https://github.com/modularorg/modularbp-gulp
[modular-css]: https://github.com/modularorg/modularbp-css
[modular-sass]: https://github.com/modularorg/modularbp-sass
[modular-js]: https://github.com/modularorg/modularbp-js
[modular-hbs]: https://github.com/modularorg/modularbp-hbs
[modular-liquid]: https://github.com/modularorg/modularbp-liquid

[gulp]: https://github.com/gulpjs/gulp
[cssnext]: https://github.com/MoOx/postcss-cssnext
[Sass]: https://github.com/sass/libsass
[PostCSS]: https://github.com/postcss/postcss
[Babel]: https://github.com/babel/babel
[Handlebars]: https://github.com/wycats/handlebars.js
[Liquid]: https://github.com/Shopify/liquid
