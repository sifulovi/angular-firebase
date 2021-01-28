import {TaskService} from './task.service';
import {Component, OnInit} from '@angular/core';
import {Project} from './project.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  isShowModal = false;
  taskList: Project[] = [];

  constructor(private service: TaskService) {

  }

  ngOnInit(): void {
    this.taskList = this.service.getProjectList();
    this.service.getProjectList().subscribe((data: any) => {
      this.taskList = data.map((project: any) => {
        return {
          key: project.payload.doc.id,
          ...project.payload.doc.data()
        };
      });
      console.log(this.taskList);
    });
  }

  showModal(): void {
    this.isShowModal = true;
  }

  handleCancel(): void {
  }

  handleOk(): void {
  }

}
