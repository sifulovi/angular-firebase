import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {


  projectTasks = {
    do: [
      { title: 'know angular routing', comment: 'done' },
      { title: 'know angular RxJS', comment: 'done' },
      { title: 'know angular Dialog', comment: 'done' },
      { title: 'know angular History', comment: 'done' },
    ],
    wip: [
      { title: 'know angular routing', comment: 'done' },
      { title: 'know angular RxJS', comment: 'done' },
      { title: 'know angular Dialog', comment: 'done' },
      { title: 'know angular History', comment: 'done' },
    ],
    done: [
      { title: 'know angular routing', comment: 'done' },
      { title: 'know angular RxJS', comment: 'done' },
      { title: 'know angular Dialog', comment: 'done' },
      { title: 'know angular History', comment: 'done' },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
