"use strict";

import TaskCards from 'src/tasks/components/TaskCards';
import TaskCardsDataService from 'src/tasks/services/TaskCardsDataService';
import TasksController from 'src/tasks/TasksController';

export default angular.module("tasks", ['ngMaterial'])
  .controller('TasksController', TasksController)
  .component(TaskCards.name, TaskCards.config)
  .service("TaskCardsDataService", TaskCardsDataService);
