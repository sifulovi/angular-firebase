import { ProjectService } from '../project.service';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NOTIFY_MESSAGE } from '../../../constant/notify-message';
import { MessageObject } from '../../../component/common/notify/model/message-object.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector   : 'app-create-todo',
  templateUrl: './create-project.component.html',
  styleUrls  : ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  @Input() public isShowModal = false;
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  @Output()
  messageObject = {} as MessageObject;

  constructor(private fb: FormBuilder,
              private taskService: ProjectService,
              private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      title      : ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  handleCancel(): void {
    this.handleModalEmitter();
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.handleModalEmitter();
  }

  handleModalEmitter(): void {
    this.isShowModal = false;
    this.modalEmitter.emit(this.isShowModal);
  }

  submitForm(value: { description: string; title: string; key: string }, template: TemplateRef<{}>): void {
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.taskService.saveProject(value)
        .then(() => {
          this.messageObject = NOTIFY_MESSAGE.PROJECT.CREATED;
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

}
