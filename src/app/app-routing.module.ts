import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFound404Component} from './component/common/not-found404/not-found404.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: '**',
    component: NotFound404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
