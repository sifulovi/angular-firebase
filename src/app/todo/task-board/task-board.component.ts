import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  isShowModal = false;
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      console.log(paramMap.get('id'));
    });
  }

  showItem(item: string): void {
    console.log(item);
  }

  showModal(): void {
    this.isShowModal = true;
  }

  handleCancel(): void { }

  handleOk(): void { }

}
