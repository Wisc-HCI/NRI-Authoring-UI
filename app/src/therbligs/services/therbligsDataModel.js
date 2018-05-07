"use strict";

var position = {
  name: '',
  type: 'position',
  val: ''
};

var physicalTherbligs = [
    {
      name: 'Transport Empty',
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
     thing: {},
    },
    {
      name: 'Transport Loaded',
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
    {
      name: 'Release Load',
      type: 'physical',
      parameters: [
        {
          name: 'Arm',
          val: '',
        },
      ],
     thing: {},
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
    },
    {
      name: 'Position',
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
      name: 'Rest',
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
