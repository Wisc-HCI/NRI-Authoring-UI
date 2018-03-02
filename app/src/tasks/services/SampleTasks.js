'use strict';
var position = {
  name: '',
  type: 'position',
  val: '',
};

var tasks = [
    {
      name: 'IKEA Kit',
      type: 'task',
      repeat: 0,
      therbligList: [
        {
          name: 'Pick and Drop',
          type: 'physical',
          parameters: [
            position,
            { name: 'Orientation',
              val: ''
            } ,
            {
              name: 'Angle',
              val: '',
            },
            {
              name: 'Arm',
              val: '',
            },
          ],
          thing: {},
        },
      ],
    },
    {
      name: 'Rothschild Kit',
      type: 'task',
      repeat: 0,
      therbligList: [
      ],
    },
    {
      name: 'Roaster Kit',
      type: 'task',
      repeat: 0,
      therbligList: [
      ],
    },
    {
      name: 'Furniture Kit',
      type: 'task',
      repeat: 0,
      therbligList: [
      ],
    }
];

export default { tasks };
