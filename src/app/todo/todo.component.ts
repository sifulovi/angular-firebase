import { TaskService } from './task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  isShowModal = false;
  taskList$!: Observable<Task[]>;

  constructor(private service: TaskService) {

  }

  ngOnInit(): void {
    this.taskList$ = this.service.getTodoList();
  }

  showModal(): void {
    this.isShowModal = true;
  }

  handleCancel(): void { }

  handleOk(): void { }

}
