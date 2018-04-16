"use strict";

function position(val) {
  this.name = 'Position (X, Y, Z)';
  this.val = '';
}

function orientation(val) {
  this.name = 'Orientation (X, Y, Z)';
  this.val = '';
}

var things = [
  {
    name: 'A',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'B',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'C',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'D',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'E',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'F',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'G',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  },
  {
    name: 'H',
    parameters: [
      new position(),
      new orientation(),
    ],
    type: 'thing'
  }
];

export default { things };
