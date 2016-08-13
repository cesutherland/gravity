/**
 * Vector
 */

'use strict';

var util = require('./util');

class Vector {
  constructor () {
    this.vector = Array.prototype.slice.call(arguments);
  }

  // Getters:

  get dimension () {
    return this.vector.length;
  }
  get magnitude () {
    return Math.sqrt(this.vector.reduce((p, n) => p + n * n, 0));
  }

  // Operations:

  subtract (vector) {
    util.assert(this.dimension === vector.dimension, 'Vectors must be same dimension to subtract.');
    this.vector.forEach((n, i) => this.vector[i] -= vector.vector[i]);
    return this;
  }
  add (vector) {
    util.assert(this.dimension === vector.dimension, 'Vectors must be same dimension to add.');
    this.vector.forEach((n, i) => this.vector[i] += vector.vector[i]);
    return this;
  }
  scale (scale) {
    // TODO preserve direction even if scale 0
    util.assert(scale, 'Scale must not be 0.');

    this.vector.forEach((n, i) => this.vector[i] *= scale);
    return this;
  }
  normalize () {
    return this.scale(1/this.magnitude);
  }

  // Utils:

  clone () {
    return new Vector(...this.vector);
  }
  toString () {
    return this.vector.toString();
  }
}


module.exports = Vector;
