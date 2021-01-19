import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { CommonSharedModule } from '../common.module';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TaskBoardComponent } from './task-board/task-board.component';


@NgModule({
  declarations: [TodoComponent, CreateTodoComponent, TaskBoardComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    CommonSharedModule
  ]
})
export class TodoModule { }
