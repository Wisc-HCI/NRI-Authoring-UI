"use strict";

var macros = [
  {
    name: "Macro One",
    therbligsList: [
      {
        name: 'Transport Empty',
        type: 'physical',
        parameters: [
          {
            name: '',
            type: 'position',
            val: ''
          },
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
      },
      {
        name: 'Grasp',
        type: 'physical',
        parameters: [
          { name: 'Effort',
            val: ''
          } ,
          {
            name: 'Arm',
            val: '',
          },
        ],
       thing: {}
      }
    ],
    type: "macro"
  }
];

export default { macros };
