import { ProjectService } from './project.service';
import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { Project } from './model/project.model';
import { Observable } from 'rxjs';
import { MessageObject } from '../../component/common/notify/model/message-object.model';
import { NOTIFY_MESSAGE } from '../../constant/notify-message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector   : 'app-todo',
  templateUrl: './project.component.html',
  styleUrls  : ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  isShowModal = false;
  projects: Project[] = [];
  isDataLoading = true;

  @Output()
  messageObject = {} as MessageObject;

  constructor(private projectService: ProjectService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.projectService.getProjectList().subscribe((data: any) => {
      this.projects = data.map((project: any) => {
        this.isDataLoading = false;
        return {
          key: project.payload.doc.id,
          ...project.payload.doc.data()
        };
      });
    });
  }

  showModal(): void {
    this.isShowModal = true;
  }

  handleCancel(): void {
  }

  handleOk(): void {
  }

  delete(projectId: string, template: TemplateRef<{}>): void {
    this.projectService.deleteProject(projectId)
        .then(() => {
          this.messageObject = NOTIFY_MESSAGE.PROJECT.DELETE;
          this.notification.template(template);
          this.handleOk();
        })
        .catch();
  }

  cancel(): void {

  }
}
