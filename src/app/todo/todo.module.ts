import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { CommonSharedModule } from '../common.module';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { CreateTaskComponent } from './task-board/create-task/create-task.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [TodoComponent, CreateTodoComponent, TaskBoardComponent, CreateTaskComponent],
    imports: [
        CommonModule,
        TodoRoutingModule,
        CommonSharedModule,
        FormsModule
    ]
})
export class TodoModule { }
