import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../project.service';
import {TaskModel} from './model/task.model';
import {TaskResponseModel} from './model/task-response.model';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  isShowModalForCreate = false;
  isShowModalForEdit = false;
  projectId = '';
  tasks: TaskModel[] = [];
  editTaskData = {} as TaskModel;
  projectTasks: TaskResponseModel = {do: [], wip: [], done: []};

  constructor(private route: ActivatedRoute, private taskService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.projectId = (paramMap.get('id') as string);
    });

    this.reload();

  }

  reload(): void {
    this.taskService.getTask(this.projectId).subscribe((data: TaskModel[]) => {
      this.projectTasks = {do: [], wip: [], done: []};
      const tasks = data.map((task: any) => {
        return {
          taskKey: task.payload.doc.id,
          ...task.payload.doc.data()
        };
      });
      for (const task of tasks) {
        debugger
        if (task.taskStatus === 'todo') {
          this.projectTasks.do = [...this.projectTasks.do, task];
        } else if (task.taskStatus === 'wip') {
          this.projectTasks.wip = [...this.projectTasks.wip, task];
        } else if (task.taskStatus === 'done') {
          this.projectTasks.done = [...this.projectTasks.done, task];
        }
      }
      console.log(this.projectTasks);
    });
  }

  showModalForCreate(): void {
    this.isShowModalForCreate = true;
  }

  showModalForEdit(task: TaskModel): void {
    this.isShowModalForEdit = true;
    this.editTaskData = task;
  }

}
