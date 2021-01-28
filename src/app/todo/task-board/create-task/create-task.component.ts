import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../task.service';
import {TaskModel} from '../model/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Input() public isShowModal = false;
  tasks: TaskModel = {projectId: '', taskDescription: '', taskKey: '', taskName: '', taskStatus: ''};

  @Input() public projectId = '';
  isOkLoading = false;
  @Output() modalEmitter = new EventEmitter();
  validateForm: FormGroup;
  selectedValue: null;


  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.validateForm = this.fb.group({
      taskName: ['', [Validators.required]],
      taskDescription: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]]
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
    this.handleModalEmitter();
  }

  handleModalEmitter(): void {
    this.isShowModal = false;
    this.modalEmitter.emit(this.isShowModal);
  }


  submitForm(value: TaskModel): void {
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    const payload = {
      ...value,
      projectId: this.projectId,
    };
    console.log(payload);
    this.taskService.saveTodo(payload);
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
