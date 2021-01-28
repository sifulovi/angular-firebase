import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { CommonSharedModule } from '../common.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { CreateTaskComponent } from './task-board/create-task/create-task.component';
import {FormsModule} from '@angular/forms';
import { EditTaskComponent } from './task-board/edit-task/edit-task.component';


@NgModule({
  declarations: [TodoComponent, CreateProjectComponent, TaskBoardComponent, CreateTaskComponent, EditTaskComponent],
    imports: [
        CommonModule,
        TodoRoutingModule,
        CommonSharedModule,
        FormsModule
    ]
})
export class TodoModule { }
