'use strict';

var gib  = require('gib');
var gulp = require('gulp');

gib(gulp, {
  server: {
    root: './public'
  },
  less: {
    src: './src/index.less',
    dest: './public/app.css'
  },
  browserify: {
    src: './src/index.js',
    dest: './public/app.js'
  }
});
