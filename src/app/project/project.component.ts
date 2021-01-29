import {ProjectService} from './project.service';
import {Component, OnInit} from '@angular/core';
import {Project} from './model/project.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  isShowModal = false;
  projects: Project[] = [];

  constructor(private service: ProjectService) {
  }

  ngOnInit(): void {
    this.service.getProjectList().subscribe((data: any) => {
      this.projects = data.map((project: any) => {
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

}
