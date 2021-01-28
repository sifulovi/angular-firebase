import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../task.service';
import {TaskModel} from './model/task.model';


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
  projectTasks: Projects = {
    do: [],
    wip: [],
    done: []
  };

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.projectId = (paramMap.get('id') as string);
    });

    this.reload();
  }

  reload(): void {
    this.taskService.getTask(this.projectId).subscribe((data: TaskModel[]) => {
      this.tasks = data.map((task: any) => {
        return {
          taskKey: task.payload.doc.id,
          ...task.payload.doc.data()
        };
      });
      // tslint:disable-next-line:no-shadowed-variable
      this.tasks.map((data: TaskModel) => {
        if (data.taskStatus === 'wip') {
          this.projectTasks.wip.push(data);
        } else if (data.taskStatus === 'done') {
          this.projectTasks.done.push(data);
        } else if (data.taskStatus === 'todo') {
          this.projectTasks.do.push(data);
        }
      });
      console.log(this.projectTasks);
    });
  }


  showItem(item: string): void {
    console.log(item);
  }

  showModalForCreate(): void {
    this.isShowModalForCreate = true;
  }

  showModalForEdit(task: TaskModel): void {
    this.isShowModalForEdit = true;
    this.editTaskData = task;
  }

  handleCancel(): void {
  }

  handleOk(): void {
  }

}

interface Projects {
  do: TaskModel[];
  wip: TaskModel[];
  done: TaskModel[];
}
