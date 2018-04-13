"use strict";

function position(val){
  this.name = 'Position (X, Y, Z)';
  this.val = '';

  /*this.x = x;
  this.y = y;
  this.z = z;*/
}

var things = [
  {
    name: 'A',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'B',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'C',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'D',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'E',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'F',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'G',
    parameters: [
      new position(),
    ],
    type: 'thing'
  },
  {
    name: 'H',
    parameters: [
      new position(),
    ],
    type: 'thing'
  }
];

export default { things };
