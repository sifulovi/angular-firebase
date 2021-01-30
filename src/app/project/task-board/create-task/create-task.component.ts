import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { TaskModel } from '../model/task.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MessageObject } from '../../../common/model/message-object.model';
import { NOTIFY_MESSAGE } from '../../../common/constant/notify-message';

@Component({
  selector   : 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls  : ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Input() public isShowModal = false;
  tasks: TaskModel = {projectId: '', taskDescription: '', taskKey: '', taskName: '', taskStatus: ''};

  @Input()
  public projectId = '';
  isOkLoading = false;
  validateForm: FormGroup;
  selectedValue: null;

  @Output()
  modalEmitter = new EventEmitter();
  @Output()
  messageObject = {} as MessageObject;

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
    this.tasks.projectId = this.projectId;
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


  save(modelData: TaskModel, template: TemplateRef<{}>): void {
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    const payload = {
      ...modelData,
      projectId: this.projectId,
    };
    this.taskService.saveTask(payload).then(() => {
      this.messageObject = NOTIFY_MESSAGE.TASK.CREATED;
      this.notification.template(template);
      this.isShowModal = false;
    })
        .catch();
    this.handleOk();
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

}
