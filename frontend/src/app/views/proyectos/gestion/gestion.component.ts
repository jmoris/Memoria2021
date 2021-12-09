import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { EChartOption } from 'echarts';
import { echartStyles } from '../../../shared/echart-styles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { NotifierService } from 'angular-notifier';
import { ToastrService } from 'ngx-toastr';

import { DetailsProjectComponent } from './details-project/details-project.component';
import { ProjectsService } from 'src/app/_services/projects.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import * as moment from 'moment/moment';


@Component({
    selector: 'app-gestion',
    templateUrl: './gestion.component.html',
    styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
    private readonly notifier: NotifierService;

    projects: any = [];
    isCompleted: boolean;
    dialogResult = "";
    data: any = {
        email: ''
    };
    step2Form: FormGroup;
    loading: boolean = false;
    user : any;

    constructor(private modalService: NgbModal,
        private projectsService: ProjectsService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private dialog: MatDialog,
        private router: Router,
        notifierService: NotifierService) {
        this.notifier = notifierService;
        this.user = this.authService.currentUserValue.user;
    }

    ngOnInit() {
        this.loadProjects();
        this.step2Form = this.fb.group({
            experience: [2]
        });
    }

    onStep1Next(e) { }
    onStep2Next(e) { }
    onStep3Next(e) { }
    onComplete(e) { }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then((result) => {
                console.log(result);
            }, (reason) => {
                console.log('Err!', reason);
            });
    }

    openAddDialog(): void {
        let dialogRef = this.dialog.open(AddProjectComponent, {
            width: '850px',
            data: 'This text is passed into the dialog',
            disableClose: true,
            autoFocus: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            this.dialogResult = result;
            if (result == 'Confirm') {
                this.toastr.success('Proyecto agregado exitosamente', 'Notificación', { timeOut: 3000 });
                this.loadProjects();
            }
        })
    }

    verProyecto(id){
        this.router.navigateByUrl('/proyectos/gestion/' + id);
    }

    openDetails(project): void {
        //recorrer arreglo de proyecto y obtener el proyecto seleccionado.

        //pasar item seleccionado al componente de detalles.
        this.dialog.open(DetailsProjectComponent, {
            width: '500px',
            data: project//selected
        });
    }

    //Método que actualiza los proyectos.
    loadProjects() {
        this.loading = true;
        this.projectsService.getAll().subscribe((projects:any) => {
            this.projects = projects;
            this.loading = false;
        });
        
    }

    formatFecha(fecha){
        return moment(fecha).format('DD-MM-YYYY hh:mm');
    }

    deleteData(id, modal, event) {
        event.target.parentElement.parentElement.blur();
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
            .result.then((result) => {
                this.projectsService.delete(id)
                    .subscribe(res => {
                        this.toastr.success('Proyecto eliminado correctamente', 'Notificación de eliminación', { timeOut: 3000 });
                        this.loadProjects();
                    })
            }, (reason) => {
            });
      }


}
