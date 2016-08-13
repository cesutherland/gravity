'use strict';

var Particle = require('./Particle');
var Vector2D = require('./Vector2D');

// Canvas setup:

var canvas = document.createElement('canvas');
var ctx    = canvas.getContext("2d");
var height = canvas.height = window.innerHeight;
var width  = canvas.width = window.innerWidth;

document.body.appendChild(canvas);


const TIME = 1000 / (365 * 24 * 60 * 60 / 16); // 1 Second = 1 Year
const GAMMA = 6.674e-11; // Gravitational constant
const SOLAR_MASS = 1.989e30;


//
// Instances:
//

var velocity = new Vector2D.build(0, Math.PI * 1.25);
var position = new Vector2D(0, 0);
var particle = new Particle(SOLAR_MASS, position, velocity);

var planets = require('./planets.json');
var particles = [
  particle
];

planets.forEach(function (planet) {
  var velocity = Vector2D.build(planet.velocity, Math.PI * 0.5);
  var position = Vector2D.build(planet.distance, 0);
  particles.push(new Particle(planet.mass, position, velocity));
});

var transform = {
  width: width,
  height: height,
  x: function (x) {
    return this.width/2 + x/5e9;
  },
  y: function (y) {
    return this.height/2 - y/5e9;
  }
};

var draw = {
  ctx: ctx,
  init: function () {
    this.ctx.translate(0.5, 0.5)
    this.previousTime = this.now();
    this.start = this.now();
  },
  particles: function () {

    var ctx = this.ctx;
    var deltaT = this.deltaT;
    var period = deltaT / TIME;

    // Forces on each particle:
    var forces = particles.map((particleA) => {
      return particles.reduce((p, particleB) => {
        if (particleA === particleB) return p;
        var difference = particleB.position.clone().subtract(particleA.position.clone());
        var distance   = difference.magnitude;
        var force      = difference.normalize().scale(GAMMA * particleA.mass * particleB.mass / (distance * distance));
        return p.add(force);
      }, new Vector2D(0, 0)); // TODO not 2D
    });

    particles.forEach((particle, i) => {

      // Calculate acceleration:
      var force = forces[i];
      var acceleration = force.clone().scale(period/particle.mass); // a_t = F_t/m

      // Adjust velocity:
      particle.velocity.add(acceleration);

      // Adjust position:
      particle.position.add(particle.velocity.clone().scale(period));

      // Draw particles:
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.arc(transform.x(particle.position.x), transform.y(particle.position.y), 3, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();

    });
  },
  coordinates: function () {

    var ctx = this.ctx;

    // Diagonals:
    ctx.beginPath();
    ctx.strokeStyle = '#ddd';
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.moveTo(0, height);
    ctx.lineTo(width, 0);
    ctx.moveTo(0, 0);
    ctx.closePath();
    ctx.stroke();

    // Horizontals::
    ctx.beginPath();
    ctx.strokeStyle = '#bbb';
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    ctx.moveTo(0, height/2);
    ctx.closePath();
    ctx.stroke();
  },
  clear: function () {
    canvas.width = width;
    canvas.height = height;
  },
  now: function () {
    return + new Date();
  },
  run: function () {
    var draw = this;
    function loop () {
      setTimeout(function () {
        draw.tick(loop);
      }, 5);
    }
    loop();
  },
  tick: function (cb) {
    var draw = this;
    window.requestAnimationFrame(function () {
      draw.deltaT = draw.now() - draw.previousTime;
      draw.clear();
      draw.coordinates();
      draw.particles();
      draw.previousTime = draw.now();
      cb && cb();
    });
  }
};

draw.init();
draw.tick();
draw.run();
