"use strict";


function position(val) {
  this.name = 'Position (X, Y, Z)';
  this.val = '';
}

function orientation(val) {
  this.name = 'Orientation (X, Y, Z)';
  this.val = '';
}

function thingObj(name) {
  this.name = name;

  this.parameters = [
    new position(),
    new orientation(),
  ];

  this.type = 'thing';
}

var things = [
  new thingObj('A'),
  new thingObj('B'),
  new thingObj('C'),
  new thingObj('D')
];

export default { things };
