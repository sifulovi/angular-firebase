import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  isShowModal = false;
  public message = 'sdfsdf';
  todoList = [
    { id: 1, title: 'Angular', description: 'today i am gonna learn Angular' },
    { id: 1, title: 'React', description: 'today i am gonna learn React' },
    { id: 1, title: 'Vue', description: 'today i am gonna learn Vue' },
    { id: 1, title: '.Net', description: 'today i am gonna learn .Net' },
    { id: 1, title: 'Express', description: 'today i am gonna learn Express' },
    { id: 1, title: 'FireBase', description: 'today i am gonna learn FireBase' },
  ];

  constructor() {
    console.log(this.isShowModal);

  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isShowModal = true;
  }

  handleCancel(): void { }

  handleOk(): void { }

}
