import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexResponsive } from "ng-apexcharts";
import { ProjectsService } from 'src/app/_services/projects.service';
import * as dayjs from 'dayjs'

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-user-activty',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {

  form: FormGroup = new FormGroup({
    selected: new FormControl({ startDate: dayjs(), endDate: dayjs() })
  });
  
  idProyecto: any;
  proyecto: any = null;
  miembroProyecto: any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  public chartOptions: Partial<ChartOptionsPie>;

  locale: any = {
    format: 'DD-MM-YYYY',
    displayFormat: 'DD/MM/YYYY',
    separator: ' al ', // default is ' - '
    cancelLabel: 'Cancelar', // detault is 'Cancel'
    applyLabel: 'Aceptar', // detault is 'Apply'
    clearLabel: 'Limpiar', // detault is 'Clear'
    customRangeLabel: 'Personalizar',
    daysOfWeek: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    monthNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  };

  constructor(
    public dialogRef: MatDialogRef<UserActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private proyectoService: ProjectsService
  ) {
    this.miembroProyecto = data.miembro;
    this.idProyecto = data.id;

    this.proyectoService.get(this.idProyecto).subscribe((data: any) => {
      this.proyecto = data;
      var fecha = dayjs(this.proyecto.repositorio.created_at);
      this.form.patchValue({
        selected: { startDate: fecha.format('DD-MM-YYYY'), endDate: fecha.add(1, 'month').format('DD-MM-YYYY') }
      });
      this.proyectoService.getUserActivity(this.idProyecto, this.miembroProyecto.name, fecha.format('YYYY-MM-DD'), fecha.add(1, 'month').format('YYYY-MM-DD')).subscribe((data: any) => {
        this.chartOptions2.series = [{
          name: 'Commits',
          data: data.commits
        }];
        this.chartOptions3.series = [{
          name: 'Adiciones',
          data: data.additions
        }, {
          name: 'Eliminaciones',
          data: data.deletions
        }];
        this.chartOptions2.xaxis = {
          labels: {
            rotate: -90
          },
          categories: data.weeks
        };
        this.chartOptions3.xaxis = {
          labels: {
            rotate: -90
          },
          categories: data.weeks
        };
        this.chartOptions.series = [
          data.open_issues, data.closed_issues, (data.total_issues - (data.open_issues + data.closed_issues))
        ];
        this.chartOptions.title = { text: "Grafico de issues (total: " + data.total_issues + ")" };
      });
    });



    this.chartOptions2 = {
      series: [
        {
          name: "Commits",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Grafico de commits"
      },
      xaxis: {
        categories: []
      }
    };
    this.chartOptions3 = {
      series: [
        {
          name: "Adiciones",
          data: []
        },
        {
          name: "Eliminaciones",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Grafico de actividad"
      },
      xaxis: {
        categories: []
      }
    };
    this.chartOptions = {
      series: [0, 0, 0],
      chart: {
        height: 250,
        type: "pie"
      },
      title: {
        text: "Grafico de issues"
      },
      labels: ["Abiertas", "Cerradas", "Otros usuarios"],
    };
  }

  ngOnInit(): void {
  }

  change(e) {
    let value = this.form.value;
    this.proyectoService.getUserActivity(this.idProyecto, this.miembroProyecto.name, dayjs(value.selected.startDate).format('YYYY-MM-DD'), dayjs(value.selected.endDate).format('YYYY-MM-DD')).subscribe((data: any) => {
      this.chartOptions2.series = [{
        name: 'Commits',
        data: data.commits
      }];
      this.chartOptions3.series = [{
        name: 'Adiciones',
        data: data.additions
      }, {
        name: 'Eliminaciones',
        data: data.deletions
      }];
      this.chartOptions2.xaxis = {
        labels: {
          rotate: -90
        },
        categories: data.weeks
      };
      this.chartOptions3.xaxis = {
        labels: {
          rotate: -90
        },
        categories: data.weeks
      };
      this.chartOptions.series = [
        data.open_issues, data.closed_issues, (data.total_issues - (data.open_issues + data.closed_issues))
      ];
      this.chartOptions.title = { text: "Grafico de issues (total: " + data.total_issues + ")" };
    });
  }

}
