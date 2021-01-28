import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Task} from './task.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private fireStore: AngularFirestore) {
  }


  todoList: Task[] = [
    {title: 'Angular', description: 'today i am gonna learn Angular'},
    {title: 'React', description: 'today i am gonna learn React'},
    {title: 'Vue', description: 'today i am gonna learn Vue'},
    {title: '.Net', description: 'today i am gonna learn .Net'},
    {title: 'Express', description: 'today i am gonna learn Express'},
    {title: 'FireBase', description: 'today i am gonna learn FireBase'},
  ];

  todoList$: Observable<Task[]> = of(this.todoList);

  getProjectList(): Observable<Task[]> {
    return this.fireStore.collection<Task>('project').valueChanges();
  }


  getTodoList(): Observable<Task[]> {
    return this.fireStore.collection<Task>('project').valueChanges();
  }

  saveTask(data: Task): void {
    this.todoList.push(data);
    this.fireStore.collection('project').add(data);
  }

  saveTodo(data: Task): void {
    this.todoList.push(data);
    this.fireStore.collection('todo').add(data);
  }


}
