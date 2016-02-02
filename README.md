[![Build Status](https://travis-ci.org/stigbd/marionette-introduction.svg?branch=master)](https://travis-ci.org/stigbd/marionette-introduction)
# Marionette-introduction
App made from reading David Sulc's books:
* [Backbone.Marionette.js: A Gentle Introduction](https://leanpub.com/marionette-gentle-introduction)
* [Bakcbone.Marionette.js: Testing and Refactoring](https://leanpub.com/marionette-testing)

## Notes
In some places there are signifcant deviations from the book, especially where I have used newer versions of the frameworks:
- localStorage works out of the box without the need for configuration
- Highligthing the Active Header is handled by bootstrap 3 out of the box,
and is omitted from my code.

## Usage
```bash
npm install
grunt init:dev
```
To run the application
```bash
grunt
```
To run the tests in the browser
```bash
grunt test
```
