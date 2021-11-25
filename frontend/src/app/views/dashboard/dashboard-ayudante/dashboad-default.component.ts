import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EChartOption } from 'echarts';
import { echartStyles } from '../../../shared/echart-styles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/_services/usuarios.service';


@Component({
    selector: 'app-dashboad-default',
    templateUrl: './dashboad-default.component.html',
    styleUrls: ['./dashboad-default.component.css']
})
export class DashboadAyudanteComponent implements OnInit {

    info: any;
    salesChartPie: EChartOption;
    dataProyectos: any;
    dataCursos: any;
    private timer: any;

    //'#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'
    //'#62549c', '#638eb0', '#6d9abd', '#799fbd', '#9181bd', '#6957af' Celeste
    //'#62549c', '#a69962', '#c2b16d', '#baad79', '#9181bd', '#6957af' Amarillo
    constructor(private userService: UsuariosService) {

        this.salesChartPie = {
            color: ['#263db5','#d22346'],
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

        this.userService.infoDash().subscribe((data) => {
            this.info = data;
            let info2 = null;
            info2 = {
                admin: 0,
                student: 0,
                teacher: 0
            };
            data.usuarios.forEach(element => {

                if (element.profile === 'admin') {
                    info2.admin = element.count;
                } else if (element.profile === 'student') {
                    info2.student = element.count;
                } else if (element.profile === 'teacher') {
                    info2.teacher = element.count;
                }
            });
            this.info.usuarios = info2;
            this.dataProyectos = {
                series: {
                    data: [
                        { value: this.info.proyectos[0].activos, name: 'Activo' },
                        { value: this.info.proyectos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
            this.dataCursos = {
                series: {
                    data: [
                        { value: this.info.cursos[0].activos, name: 'Activo' },
                        { value: this.info.cursos[1].inactivos, name: 'Inactivo' }
                    ]
                }
            };
        });

    }

    ngOnInit() {

    }

    onChartInit(e) {

    }
}
