import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EChartOption } from 'echarts';
import { echartStyles } from '../../../shared/echart-styles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { DashboardsService } from 'src/app/_services/dashboards.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-dashboad-estudiante',
    templateUrl: './dashboad-estudiante.component.html',
    styleUrls: ['./dashboad-estudiante.component.css']
})
export class DashboadEstudianteComponent implements OnInit {

    info: any;
    salesChartPie: EChartOption;
    dataProyectos: any;
    dataCursos: any;
    usuarios : any = [];
    private timer: any;

    // '#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'
    // '#62549c', '#638eb0', '#6d9abd', '#799fbd', '#9181bd', '#6957af' Celeste
    // '#62549c', '#a69962', '#c2b16d', '#baad79', '#9181bd', '#6957af' Amarillo
    constructor(private dsService: DashboardsService, private userService: UsuariosService, private toastr : ToastrService) {

        this.salesChartPie = {
            color: ['#263db5', '#d22346'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },

            xAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }

            ],
            yAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
            ],
            series: [{
                name: 'Proyectos',
                type: 'pie',
                radius: '75%',
                center: ['50%', '50%'],
                data: [
                    { value: 0, name: 'Activo' },
                    { value: 0, name: 'Inactivo' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        };

        this.dsService.getDashboardInfo().subscribe((data) => {
            console.log(data);
            this.info = data;
        });
        this.userService.testGithub().subscribe((data:any) => {
            if(data.status == 500){
                this.toastr.warning('Las credenciales de Github son invalidas.', 'Notificación', { timeOut: 3000 });
            }
            console.log(data);
        });
    }

    ngOnInit() {

    }

    onChartInit(e) {

    }
}
