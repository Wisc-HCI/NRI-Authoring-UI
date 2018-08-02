"use strict";

import TaskCards from 'src/tasks/components/TaskCards';
import TaskCardsDataService from 'src/tasks/services/TaskCardsDataService';
import TasksController from 'src/tasks/TasksController';
import TaskInstanceController from 'src/tasks/TaskInstanceController';

export default angular.module("tasks", ['ngMaterial','rosService'])
  .controller('TasksController', TasksController)
  .controller('TaskInstanceController', TaskInstanceController)
  .component(TaskCards.name, TaskCards.config)
  .service("TaskCardsDataService", TaskCardsDataService);
  