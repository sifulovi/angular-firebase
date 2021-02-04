import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { CommonSharedModule } from '../../common.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { CreateTaskComponent } from './task-board/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { EditTaskComponent } from './task-board/edit-task/edit-task.component';
import { NotifyComponent } from '../../component/common/notify/notify.component';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ProjectComponent,
    CreateProjectComponent,
    TaskBoardComponent,
    CreateTaskComponent,
    EditTaskComponent,
    NotifyComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    CommonSharedModule,
    FormsModule,
    ChartsModule,
    NgApexchartsModule
  ]
})
export class ProjectModule {
}
