"use strict";

var position = {
  name: '',
  type: 'position',
  val: ''
};

var physicalTherbligs = [
    {
      name: 'transport empty',
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
      allowed: ['rest', 'grasp'],
      assign: false,
    },
    {
      name: 'grasp',
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
     thing: {},
     allowed: ['transport loaded', 'hold', 'release load', 'position'],
     assign: false,
    },
    {
      name: 'transport loaded',
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
     allowed: ['release Load', 'position', 'hold'],
     assign: false,
    },
    {
      name: 'release load',
      type: 'physical',
      parameters: [
        {
          name: 'Arm',
          val: '',
        },
      ],
     thing: {},
     allowed: ['transport empty', 'grasp', 'rest'],
     assign: false,
    },
    {
      name: 'Hold',
      type: 'physical',
      parameters: [
        {
          name: 'Duration',
          val: ''
        },
        { name: 'Grasp Effort',
          val: ''
        } ,
      ],
     thing: {},
     allowed: ['transport loaded', 'release load'],
     assign: false,
    },
    {
      name: 'position',
      type: 'physical',
      parameters: [
        position,
        { name: 'Orientation',
          val: ''
        } ,
        {
          name: 'Arm',
          val: '',
        },
      ],
      allowed: ['transport loaded', 'hold', 'release load'],
      assign: false,
    },
    /*
    {
      name: 'Preposition',
      type: 'physical',
      parameters: [
        position,
        { name: 'Orientation',
          val: ''
        } ,
        {
          name: 'Arm',
          val: '',
        },
      ],
    },
    */
    {
      name: 'rest',
      type: 'physical',
      parameters: [
        position,
        { name: 'Orientation',
          val: ''
        } ,
        {
          name: 'Duration',
          val: '',
        },
      ],
      allowed: ['transport Empty', 'grasp'],
      assign: false,
    },
];

var object = {
  name: 'Object',
  type: '',
};

var regionBoundaries = {
  name: 'Region Boundaries (x, y, z)',
  val: '',
};

var searchRoutine = {
  name: ' Search Routine',
  val: '',
};

var selectCriteria = {
  name: 'Select Criteria',
  val: '',
};

var decisionConstraints = {
  name: 'Decision Constraints',
  val: '',
};

var qualityConditions = {
  name: 'Quality Conditions',
  val: '',
};

var initialState = {
  name: 'Initial State',
  val: '',
};

var goalState = {
  name: 'Goal State',
  val: '',
};

var planningConstraints = {
  name: 'Planning Constraints',
  val: '',
};

var cognitiveTherbligs = [
  {
    name: 'Search',
    type: 'cognitive',
    parameters: [
      object,
      regionBoundaries,
      searchRoutine,
    ],
    thing: {}
  },
  {
    name: 'Find',
    type: 'cognitive',
    parameters: [],
    thing: {}
  },
  {
    name: 'Select',
    type: 'cognitive',
    parameters: [
      object,
      selectCriteria,
      decisionConstraints,
    ],
    thing: {}
  },
  {
    name: 'Inspect',
    type: 'cognitive',
    parameters: [
      object,
      qualityConditions,
    ],
    thing: {}
  },
  {
    name: 'Plan',
    type: 'cognitive',
    parameters: [
      initialState,
      goalState,
      planningConstraints,
    ],
    thing: {}
  },
];

var objects = {
  name: 'Objects',
  val: '',
};

var goalCriteria = {
  name: 'Goal Criteria',
  val: '',
};

var assemblyConstraints = {
  name: 'Assembly Constraints',
  val: '',
};

var disassemblyConstraints = {
  name: 'Disassembly Constraints',
  val: '',
};

var tool = {
  name: 'Tool',
  val: '',
};

var toolMethods = {
  name: 'Tool Methods',
  val: '',
};

var cogPhysTherbligs = [
  {
    name: 'Assemble',
    type: 'cognitivePhysical',
    parameters: [
      objects,
      goalCriteria,
      assemblyConstraints,
    ],
    thing: {}
  },
  {
    name: 'Disassemble',
    type: 'cognitivePhysical',
    parameters: [
      objects,
      goalCriteria,
      disassemblyConstraints,
    ],
    thing: {}
  },
  {
    name: 'Use',
    type: 'cognitivePhysical',
    parameters: [
      tool,
      toolMethods,
    ],
    thing: {}
  },
];

export default { physicalTherbligs, cognitiveTherbligs, cogPhysTherbligs};
