import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Project} from './model/project.model';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {TaskModel} from './task-board/model/task.model';
import {FunctionCall} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private fireStore: AngularFirestore) {
  }


  todoList: Project[] = [];

  todoList$: Observable<Project[]> = of(this.todoList);

  getProjectList(): any {
    return this.fireStore.collection('project').snapshotChanges();
  }

  getTask(projectId: string): any {
    return this.fireStore.collection('task', (ref) => ref.where('projectId', '==', projectId)).snapshotChanges();
  }

  saveProject(data: Project): void {
    this.todoList.push(data);
    this.fireStore.collection('project').add(data);
  }

  saveTodo(data: TaskModel): void {
    console.log(data);
    this.fireStore.collection('task').add(data);
  }

  updateTodo(data: TaskModel): void {
    this.fireStore.collection('task').doc(data.taskKey).update(data);
  }


}
