import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {


  projectTasks = {
    do: [
      { title: 'DO angular routing', comment: 'do' },
      { title: 'DO angular RxJS', comment: 'do' },
      { title: 'DO angular Dialog', comment: 'do' },
      { title: 'DO angular History', comment: 'do' },
    ],
    wip: [
      { title: 'WIP angular routing', comment: 'work in progress' },
      { title: 'WIP angular RxJS', comment: 'work in progress' },
      { title: 'WIP angular Dialog', comment: 'work in progress' },
      { title: 'WIP angular History', comment: 'work in progress' },
    ],
    done: [
      { title: 'DONE angular routing', comment: 'done' },
      { title: 'DONE angular RxJS', comment: 'done' },
      { title: 'DONE angular Dialog', comment: 'done' },
      { title: 'DONE angular History', comment: 'done' },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
