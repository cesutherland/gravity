/**
 * Vector in 2 Dimensions
 */

var Vector = require('./Vector');

class Vector2D extends Vector {
  get x () {
    return this.vector[0];
  }
  get y () {
    return this.vector[1];
  }
};

Vector2D.build = function (magnitude, theta) {
  var x = Math.cos(theta) * magnitude;
  var y = Math.sin(theta) * magnitude;
  return new Vector2D(x, y);
}


module.exports = Vector2D;
