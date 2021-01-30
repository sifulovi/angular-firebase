import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Project } from './model/project.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TaskModel } from './task-board/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private fireStore: AngularFirestore) {
  }

  todoList: Project[] = [];

  getProjectList(): any {
    return this.fireStore.collection('project').snapshotChanges();
  }

  getTask(projectId: string): any {
    return this.fireStore.collection('task', (ref) => ref.where('projectId', '==', projectId)).snapshotChanges();
  }

  saveProject(data: Project): Promise<DocumentReference<unknown>> {
    return this.fireStore.collection('project').add(data);
  }

  saveTask(data: TaskModel): Promise<DocumentReference<unknown>> {
    return this.fireStore.collection('task').add(data);
  }

  updateTask(data: TaskModel): Promise<void> {
    return this.fireStore.collection('task').doc(data.taskKey).update(data);
  }

  deleteTask(taskKey: string): Promise<void> {
    return this.fireStore.collection('task').doc(taskKey).delete();
  }

  deleteProject(projectKey: string): Promise<void> {
    this.deleteAllTaskByProjectId(projectKey);
    return this.fireStore.collection('project').doc(projectKey).delete();
  }

  deleteAllTaskByProjectId(projectKey: string): void {
    this.fireStore.collection('task', (ref) => ref.where('projectId', '==', projectKey)).snapshotChanges().pipe(
      map(actions => actions.map(projectDoc => {
        const id = projectDoc.payload.doc.id;
        this.fireStore.collection('task').doc(id).delete()
            .then()
            .catch(() => {console.log('err'); });
      }))
    );
  }

}
