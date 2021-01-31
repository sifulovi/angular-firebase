import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { TaskModel } from '../model/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MessageObject } from '../../../../component/common/notify/model/message-object.model';
import { NOTIFY_MESSAGE } from '../../../../constant/notify-message';

@Component({
  selector   : 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls  : ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  @Input() public isShowModal = false;
  @Input() @Output() taskData = {} as TaskModel;

  @Output()
  messageObject = {} as MessageObject;

  @Input() public projectId = '';
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;


  constructor(private fb: FormBuilder,
              private taskService: ProjectService,
              private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      taskName       : ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      taskStatus     : ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.handleModalEmitter();
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.handleModalEmitter();
    }, 1000);
  }

  handleModalEmitter(): void {
    this.isShowModal = false;
    this.modalEmitter.emit(this.isShowModal);
  }


  update(taskModel: TaskModel, template: TemplateRef<{}>): void {
    this.messageObject = NOTIFY_MESSAGE.TASK.EDIT;
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    const payload = {
      ...taskModel,
      taskKey: this.taskData.taskKey
    };
    this.taskService.updateTask(payload)
        .then(() => {
          this.notification.template(template);
          this.handleOk();
        })
        .catch();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  delete(template: TemplateRef<{}>): void {
    this.messageObject = NOTIFY_MESSAGE.TASK.DELETE;
    this.taskService.deleteTask(this.taskData.taskKey)
        .then(() => {
          this.notification.template(template);
          this.handleOk();
        })
        .catch();
  }

  cancel(): void {

  }
}
