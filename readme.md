##Lloyds react / flux framework

###Getting started

If you dont have gulp installed

`npm install --global gulp`

Install the framework dependencies

`npm install`

#### Node version

This project requires node 4.x please check your current version and upgrade if needed.

`node --version`

###Gulp tasks

`gulp`

this default task provides:
- preview server with livereload
- sass compiling
- jsx / es6 transforming via Browserify

http://localhost:9000

`node app`

Runs a node server to preview the server rendered part of this isomorphic app

http://localhost:9001

###Git branching

The main development branch is dev/core.

This acts as a holding branch and a base to branch off of. Do not work directly in this branch. make a short lived branch off of this and create a pull request to merge your finished work. Before creating your pull request merge dev/core into your branch to make sure you have the latest version and fixed any merge conflicts. 

##Goals of this framework

This framework has been written to enable the development of React components interacting with the Flux architecture. It contains all of the tools required to develop, lint, test, build & preview.

####Tools used

- Gulp
- libsass
- Browsersync
- Jasmine
- React
- Flux
- Babel
- Browserify
- jscs
- scss-lint

##Linting & code style

We have setup code style rules for js/jsx & scss. All code must follow these rules, any code that falls outside of these rules will be rejected. I would advise setting your IDE up to provide inline linting.

// TODO provide instructions for setting this up across popular IDE's
