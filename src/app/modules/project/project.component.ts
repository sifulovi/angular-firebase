import { ProjectService } from './project.service';
import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Project } from './model/project.model';
import { MessageObject } from '../../component/common/notify/model/message-object.model';
import { NOTIFY_MESSAGE } from '../../constant/notify-message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { TaskModel } from './task-board/model/task.model';

export type ChartOptions = {
  series: ApexNonAxisChartSeries[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

interface XYX {
  series: ApexNonAxisChartSeries[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}

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


  @ViewChild('chart') chart: ChartComponent | undefined;
  chartOptions: Partial<ChartOptions> | XYX = {
    chart     : {
      type: 'donut'
    },
    series    : [[0]],
    labels    : ['Empty'],
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

  constructor(private projectService: ProjectService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {

    let budgie: any = [];
    this.chartOptions.series = [];
    this.projectService.getProjectList().subscribe((data: any) => {
      this.projects = data.map((project: any) => {
        this.isDataLoading = false;
        this.projectService.getTask(project.payload.doc.id).subscribe((taskModels: TaskModel[]) => {
          this.chartOptions.series = [];
          const tasks = taskModels.map((task: any) => {
            return {
              taskKey: task.payload.doc.id,
              ...task.payload.doc.data()
            };
          });

          const wipCount = tasks.filter((a: any) => a.taskStatus === 'wip');
          const doneCount = tasks.filter((a: any) => a.taskStatus === 'done');
          const todoCount = tasks.filter((a: any) => a.taskStatus === 'do');
          budgie = [...budgie, [todoCount.length, wipCount.length, doneCount.length]];
          console.log('bugie', budgie);
          this.chartOptions = {
            series    : [...budgie],
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
        });

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
