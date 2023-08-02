import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ProjectsService } from 'src/app/_services/projects.service';
import * as moment from 'moment/moment';
import { FormControl, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';

export interface Maat {
  entity: string,
  nrevs: number,
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-informe-maat',
  templateUrl: './informe-maat.component.html',
  styleUrls: ['./informe-maat.component.scss'],
})
export class InformeMaatComponent implements OnInit {

  @Input() id: any;
  @Input() createdDate: any;
  @Output() change: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  info: any = [];
  loading: boolean;
  displayedColumns: string[] = ["entity", "nrevs", "accion"];

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  hoveredDate: NgbDate | null = null;
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;

  entityComplexity: any = { };

  form: FormGroup = new FormGroup({
    selected: new FormControl({ startDate: dayjs(), endDate: dayjs() })
  });


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

  dsMaat: MatTableDataSource<Maat> = new MatTableDataSource<Maat>();
  @ViewChild(MatSort) maatSort: MatSort = new MatSort();
  @ViewChild(MatPaginator) maatPag: MatPaginator;

  constructor(private proyectoService: ProjectsService,
    private modalService: NgbModal,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = true;
      this.change.emit(this.loading);
      let fecha = moment(this.createdDate).format('DD-MM-YYYY').split('-');
      this.createdDate = new NgbDate(parseInt(fecha[2]), parseInt(fecha[1]), parseInt(fecha[0]));
      this.fromDate = new NgbDate(parseInt(fecha[2]), parseInt(fecha[1]), parseInt(fecha[0]));
      this.proyectoService.getMaatReport(this.id).subscribe((data: any) => {
        this.info = data;;

        this.dsMaat.data = this.info;
        this.dsMaat.paginator = this.maatPag;
        this.dsMaat.sort = this.maatSort;
        this.loading = false;
        this.change.emit(this.loading);
      });
      this.chartOptions = {
        series: [
          {
            name: "Complejidad",
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        title: {
          text: "Grafico de complejidad"
        },
        xaxis: {
          categories: []
        }
      };
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
    });

  }

  ngAfterViewInit(): void {
    console.log(this.maatSort);
    this.dsMaat.paginator = this.maatPag;
    this.dsMaat.sort = this.maatSort;
  }

  openPCAModal(modal, filename) {
    this.chartOptions.series = [{
      name: 'Complejidad',
      data: []
    }];
    this.fromDate = this.createdDate;
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.chartOptions.xaxis.categories = [];
    console.log(filename);
    if (filename != undefined)
      this.entityComplexity.entity = filename;
    this.projectComplexityAnalysis(this.entityComplexity.entity, this.fromDate, this.toDate);
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  complexityAnalysis(modal, filename) {
    this.proyectoService.getComplexityAnalysis(this.id, filename).subscribe((data) => {
      this.entityComplexity = data;
      this.entityComplexity.entity = filename;
      this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    });
  }

  projectComplexityAnalysis(filename, from_date, to_date) {
    this.loading = true;
    let desde = this.formatDateNgb(from_date);
    let hasta = this.formatDateNgb(to_date);
    this.proyectoService.getProjectComplexityAnalysis(this.id, filename, desde, hasta).subscribe((data) => {
      this.entityComplexity = data;
      this.entityComplexity.entity = filename;
      this.chartOptions.series = [{
        name: 'Complejidad',
        data: data.y
      }];
      this.chartOptions.xaxis.categories = data.x;

      this.loading = false;
    });

  }

  changeDate(e){
    let value = this.form.value;
    this.loading = true;
    let desde = dayjs(value.selected.startDate).format('YYYY-MM-DD')
    let hasta = dayjs(value.selected.endDate).format('YYYY-MM-DD')
    let filename =this.entityComplexity.entity;
    this.proyectoService.getProjectComplexityAnalysis(this.id, filename, desde, hasta).subscribe((data) => {
      this.entityComplexity = data;
      this.entityComplexity.entity = filename;
      this.chartOptions.series = [{
        name: 'Complejidad',
        data: data.y
      }];
      this.chartOptions.xaxis.categories = data.x;

      this.loading = false;
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if(this.fromDate != null && this.toDate != null){
        this.projectComplexityAnalysis(this.entityComplexity.entity, this.fromDate, this.toDate);
    }
  }

  formatDateNgb(d: NgbDate): string {
    if (d === null) {
      return null;
    }

    return [
      d.year,
      (d.month < 10 ? ('0' + d.month) : d.month),
      (d.day < 10 ? ('0' + d.day) : d.day),
    ].join('-');
  }

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
}
