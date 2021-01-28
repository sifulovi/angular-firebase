import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Project} from './project.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {TaskModel} from './task-board/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private fireStore: AngularFirestore) {
  }


  todoList: Project[] = [];

  todoList$: Observable<Project[]> = of(this.todoList);

  getProjectList(): any {
    return this.fireStore.collection('project').snapshotChanges();
  }

  getTodoList(): Observable<Project[]> {
    return this.fireStore.collection<Project>('project').valueChanges();
  }

  saveProject(data: Project): void {
    this.todoList.push(data);
    this.fireStore.collection('project').add(data);
  }

  saveTodo(data: TaskModel): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    // this.todoList.push(data);
    this.fireStore.collection('task').add(data);
  }


}
