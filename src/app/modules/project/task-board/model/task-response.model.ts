import {TaskModel} from './task.model';

export interface TaskResponseModel {
  do: TaskModel[];
  wip: TaskModel[];
  done: TaskModel[];
}
