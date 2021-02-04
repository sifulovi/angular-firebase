import { ProjectService } from './project.service';
import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Project } from './model/project.model';
import { MessageObject } from '../../component/common/notify/model/message-object.model';
import { NOTIFY_MESSAGE } from '../../constant/notify-message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

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


  public doughnutChartLabels: Label[] = ['Todo', 'WIP', 'Done'];
  public doughnutChartData: MultiDataSet = [
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';


  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | undefined;

  constructor(private projectService: ProjectService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.chartOptions = {
      series    : [44, 55, 13],
      chart     : {
        type: 'donut'
      },
      labels    : ['Todo', 'WIP', 'Done'],
      responsive: [
        {
          breakpoint: 480,
          options   : {
            chart : {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };


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
