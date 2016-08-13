/**
 * Particle
 */

'use strict';

class Particle {
  constructor (mass, position, velocity) {
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
  }
  get momentum () {
    return this.velocity.clone().scale(this.mass);
  }
}


module.exports = Particle;
