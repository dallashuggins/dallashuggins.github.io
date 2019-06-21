# React webpack babel

## Configuration

### Webpack

#### Setup
- The core webpack file is `webpack.config.js`. 
- The `webpack.config.js` file requires a number of modules; descriptions for these modules are included below. 
- The `webpack/loaders.js` file includes the various loaders which will be used to preprocess files; see the section on `webpack/loaders` for more info. These loaders are imported into the `webpack.common.js` file and are listed as rules. 
- The `webpack/resolve.js` file contains details on how modules are resolved; see the section on `webpack/resolve` for more info. This file is imported into the `webpack.common.js` file and associated with the `resolve` object. A resolver is a library which helps in locating a module by its absolute path; resolvers help webpack find the module code that needs to be included in the bundle for each `require`/`import` statement. Resources: [resolve configuration](https://webpack.js.org/configuration/resolve/) and [module resolution concepts](https://webpack.js.org/concepts/module-resolution/).
- The `webpack.common.js` file has the Webpack configuration for both dev/prod; see the section on `Configuration` for more info.
- The `webpack.dev.js` file has the configuration aspects specific to the development environment.
- The `webpack.prod.js` file has the configuration aspects specific to the production environment. 

Configure how modules are resolved. For example, when calling import 'lodash' in ES2015, the resolve options can change where webpack goes to look for 'lodash' (see modules).

#### Configuration

_Development_: Running `npm start` uses the script `webpack-dev-server --hot --config webpack.dev.js`. The `webpack-dev-server` module uses a development server that provides live reloading to be used in development mode; [more info here](https://webpack.js.org/configuration/dev-server/). When the `--hot` option is provided it enables webpack's Hot Module Replacement feature (the `webpack.HotModuleReplacementPlugin` is added). The `Hot Module Replacement` exchanges, adds, or removes modules while an application is running, without a full reload; [more info here](https://webpack.js.org/concepts/hot-module-replacement/). The config used for development is `webpack.dev.js`. 

_Production_: Running `npm build` uses the script `webpack --config webpack.prod.js --color`. The `webpack` module _. When the `--color` option is provided, it enables colors on the console. 

##### Helper modules
- `path`: Node module that is built-in, which handles file paths.
- `clean-webpack-plugin`: It's good practice to clean the /dist folder before each build, so that only used files will be generated. The clean-webpack-plugin plugin can be used to manage this; more info [here](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder).
- `html-webpack-plugin`: Simplifies creation of HTML files to serve your webpack bundles, which is especially useful for webpack bundles that include a hash in the filename which changes every compilation; more info [here](https://webpack.js.org/plugins/html-webpack-plugin/).
- `webpack-merge`: Provides a merge functions that concatenates arrays and merges objects creating a new object; if functions are encountered, it will execute them, run the results through the algorithm, and then wrap the returned values within a function again [(source)](https://github.com/survivejs/webpack-merge). This is being used to merge together the common configuration options (`webpack.common.js`) and the dev or production-specific configuration options. 


##### webpack.dev.js
- The `webpack-merge` modules merges in the `webpack.common.js` file.
- The `mode` is set to 'development'.
- The `devtool` is set to 'eval', which is ideal for development; [more info here](https://webpack.js.org/configuration/devtool/). Each module is executed with `eval()` and `//@ sourceURL`. 

##### webpack.prod.js
- The `webpack-merge` modules merges in the `webpack.common.js` file.
- The `mode` is set to 'production'.
- The `devtool` is set to 'source-map', which is often used for production; [more info here](https://webpack.js.org/configuration/devtool/). A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.

##### webpack.common.js
- `context`: The base directory, an absolute path, for resolving entry points and loaders from configuration; [more info here](https://webpack.js.org/configuration/entry-context#context). We are passing in the `src` directory as the base directory.
- `entry`: Defines the point(s) of entry for the application; [more info here](https://webpack.js.org/configuration/entry-context#entry). Passing in an array of file paths creates a "multi-main entry", which helps with injecting multiple dependent files together and graphing their dependencies into one "chunk". We are passing in the `index.jsx` file in the `js` directory (and within `src`, since that is provided as the context).
- `output`: The output object contains the set of options instructing webpack on how and where it should output your bundles, assets, etc.; [more info here](https://webpack.js.org/configuration/output). We are specifying the output `path` option as a `dist` directory at the root level, and the `filename`, the name of each output bundle, as `bundle.js` (inside `dist`). 
- `resolve`: See the `webpack/resolve.js` section for more info on the resolves. 
- `module.rules`: An array of rules which are matched to requests when modules are created, and can modify how the module is created. See the `webpack/loaders.js` section for more info on the resolves. 
- `plugins`: The plugins option is where you csan specify plugins to customize the build process; [more info here](https://webpack.js.org/configuration/plugins). We are using the plugins `clean-webpack-plugin` and `html-webpack-plugin`. We're using the default settings for `CleanWebpackPlugin`, which means it will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild; [more info here](https://github.com/johnagan/clean-webpack-plugin). The `HtmlWebpackPlugin` plugin simplifies the creation of HTML files to serve bundles, which is especially useful for webpack bundles that include a hash in the filename which changes every compilation; [more info here](https://github.com/jantimon/html-webpack-plugin). We are passing in the `title` to use for the generated HTML document, the `hash` boolean set to true which means it will append a unique webpack compilation hash to all included scripts and CSS files (useful for cache busting), and finally the `template` is the path to the template (`index.html`).

##### webpack/loaders: 
- `reactSvg`: Transforms svg files into React components so they can be rendered like other components, using `babel-loader` and `react-svg-loader` to do this; more info [here](https://github.com/boopathi/react-svg-loader/tree/master/packages/react-svg-loader).
- `js`: Transpiles JavaScript files using webpack's `babel-loader`, excluding `node_modules`. 
- `imagesViaUrl`: Transforms files into base64 URIs, using the webpack loader `url-loader`. 
- `imagesViaFile`: Resolves import/require() on a file into a url and emits the file into the output directory, using the webpack loader `file-loader`.
- `sass`: Uses the webpack loaders `style-loader`, `postcss-loader`, `css-loader`, and `sass-loader`. 
 - `style-loader`: adds CSS to the DOM by injecting a <style> tag.
 - `postcss-loader`: loads and transforms a CSS/SSS file using PostCSS
 - `css-loader`: loads CSS file with resolved imports and returns CSS code (interprets @import and url() like import/require() and will resolve them). The `modules` option enables CSS modules and setup mode. The `importLoaders` option allows you to configure which loaders should be applied to @imported resources, so in this case it's postcss and sass (=2). The `localIdentName` option configures the generated ident. 
 - `sass-loader`: loads and compiles a SASS/SCSS file. The `indentedSyntax` option is telling it you want to work with sass and not scss.
- `scss`: The same loaders were added to `sass`, so refer to the above descriptions. The only difference is we're not specifying `indentedSyntax`, since we are this time working with `scss`. 

##### webpack/resolve: 
- `resolve.modules`: Provide directories should be searched when resolving modules; [more info here](https://webpack.js.org/configuration/resolve/#resolvemodules). We are telling webpack that we want the `src` and `node_modules` directories. 
- `resolve.alias`: Create aliases to import or require certain modules more easily; [more info here](https://webpack.js.org/configuration/resolve/#resolvealias). We create an alias for `styles` so that we can `@import '~styles/[file].sass'`. We do this by using the `path.resolve()` method, which resolves a sequence of paths or path segments into an absolute path, and we pass it the [__dirname](https://nodejs.org/api/modules.html#modules_dirname), the directory name of the current module, and then the '../src/styles/' path, which is where you can find the stylesheets.
- `resolve.extensions`: List of extensions to resolve; [more info here](https://webpack.js.org/configuration/resolve/#resolveextensions). Generates all the possible paths to a module, so Webpack will continue to search for each path (`.js`, `.jsx`, `.sass`, `.svg`, `.png`) until it finds a file.


##### Regex
**/\.js(x)?$/**
  - `/`: start; indicates the start of a regular expression.
  - `\.`: matches a "." character. 
  - `j` and `s`: matches the characters "j" and "s". 
  - `(x)`: groups multiple tokens together and creates a capture group for extracting a substring or using a backreference; the parentheses signifies a capturing group.
  - `?`: matches 0 or 1 of the preceding token, effectively making it optional; this means x is optional (matches js and jsx files).
  - `$`: matches the end of the string, or the end of a line if the multiline flag (m) is enabled. This matches a position, not a character.
  - `/`: close; indicates the end of a regular expression.

**/\.(png|jpe?g|gif)$/**
  - `(png|jpe?g|gif)`: matches png, jpg, jpeg, and gif files.
  - `|`: acts as an "or". 

### Babel

#### Setup
- The core babel file is `.babelrc`. 

#### Plugins
`lodash`
- A modern JavaScript utility library delivering modularity, performance & extras.

`@babel/plugin-proposal-function-bind`
- Stage 0 
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-function-bind)
- [ECMAScript This-Binding Syntax Github documentation](https://github.com/tc39/proposal-bind-operator)
- Use `::` in place of `.bind()`. 
- This proposal introduces a new operator `::` which performs `this` binding and method extraction.

Example: 
```
obj::func
// is equivalent to:
func.bind(obj)
```

`@babel/plugin-proposal-export-default-from`
- Stage 1
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from)
- [ECMAScript Proposal: export default from Github documentation](https://github.com/tc39/proposal-export-default-from)
- ECMAScript 2015's currently supported export statements: single exports with `export {x} from "mod"`, single imports while renaming with `export {x as v} from "mod"`, and finally spreading exports with `export * from "mod"`. This proposes the addition of a new export statement of the format `export v from "mod"`. This proposed symmetric "export from" statement would match the current `import v from "mod"` format that already exists, instead of using the `export {v}`.

`@babel/plugin-proposal-optional-chaining`
- Stage 1
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [TC39 Optional Chaining for JavaScript Github documentation](https://github.com/tc39/proposal-optional-chaining)
- Format: array with two arguments; first `@babel/plugin-proposal-optional-chaining` and second `{ "loose": false }`.
- When `loose` is set to true, this transform will pretend `document.all` does not exist, and perform loose equality checks with `null` instead of strict equality checks against both `null` and `undefined`. 
- Intermediate nodes have to be checked when looking for a property value that's deep in a tree-like structure, such as here: `var street = user.address && user.address.street`. Often with `if` statements or ternary operators, a value needs to be checked before a nested value. This optional chaining operator allows for handling of many of those cases without repeating themselves and/or assigning intermediate results in temporary variables, such as this: `var street = user.address?.street`. 

`@babel/plugin-proposal-do-expression`
- Stage 1
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-do-expressions)
- [TC39 ECMAScript proposal: do expressions Github documentation](https://github.com/tc39/proposal-do-expressions)
- The `do { .. }` expression executes a block (with one or many statements in it), and the final statement completion value inside the block becomes the completion value of the do expression.

`@babel/plugin-proposal-decorators`
- Stage 2 (?)
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) with examples.
- [TC39 decoraters proposal](https://github.com/wycats/javascript-decorators/blob/master/README.md)
- Format: array with two arguments; first `@babel/plugin-proposal-decorators` and second `{ "legacy": true }`.
- Decorators make it possible to annotate and modify classes and properties at design time. While ES5 object literals support arbitrary expressions in the value position, ES6 classes only support literal functions as values. Decorators restore the ability to run code at design time, while maintaining a declarative syntax.
- A decorator is an expression that evaluates to a function, that takes the target, name, and decorator descriptor as arguments, and optionally returns a decorator descriptor to install on the target object. 

`@babel/plugin-syntax-dynamic-import`
- Stage 3
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)
- Allows for the parsing of `import()`.

`@babel/plugin-syntax-import-meta`
- Stage 3
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-syntax-import-meta)
- Allows for the parsing of `import.meta`.

`@babel/plugin-proposal-class-properties`
- Stage 2 (3?)
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
- [Class field declarations for JavaScript Github documentation](https://github.com/tc39/proposal-class-fields)
- Format: array with two arguments; first `@babel/plugin-proposal-class-properties` and second `{ "loose": true }`.
- When `loose` is set to true, class properties are compiled to use an assignment expression instead of `Object.defineProperty`.
- _Note_: The error "Support for the experimental syntax 'classProperties' isn't currently enabled" is returned when this plugin is not enabled and `state={}` is added to a React component. 

`@babel/plugin-proposal-json-strings`
- Stage 4
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-proposal-json-strings)
- [Subsume JSON (a.k.a. JSON ⊂ ECMAScript) Github documentation](https://github.com/tc39/proposal-json-superset)
- Extends ECMA-262 syntax into a superset of JSON.

`@babel/plugin-transform-runtime`
- [Babel docs](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
- If you use async functions without this plugin, you will receive a "ReferenceError: regeneratorRuntime is not defined" error. 

##### Stage-X (Experimental Presets)

[Documentation on staging](https://babeljs.io/docs/en/presets)

*Stage 0* - Strawman: just an idea, possible Babel plugin.
*Stage 1* - Proposal: this is worth working on.
*Stage 2* - Draft: initial spec.
*Stage 3* - Candidate: complete spec and initial browser implementations.
*Stage 4* - Finished: will be added to the next yearly release.