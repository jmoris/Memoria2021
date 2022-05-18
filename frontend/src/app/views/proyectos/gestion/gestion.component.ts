import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
import { EditProjectComponent } from '../edit-project/edit-project.component';


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

    form: FormGroup;
    loading: boolean = false;
    user : any;
    isAlumno : boolean = false;
    currentUser : any;
    anoActual:any = new Date().getFullYear();

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
        this.currentUser = authService.currentUserValue;
        if(this.currentUser.role == 'Alumno'){
            this.isAlumno = true;
        }
    }

    ngOnInit() {
        this.loadProjects();
        this.step2Form = this.fb.group({
            experience: [2]
        });
        this.form = new FormGroup({
            year: new FormControl(this.anoActual, [Validators.required]),
            semester: new FormControl("", [Validators.required]),
            status: new FormControl("", [Validators.required]),
          });
    }

    onStep1Next(e) { }
    onStep2Next(e) { }
    onStep3Next(e) { }
    onComplete(e) { }

    onCleanClick(){
        this.form = new FormGroup({
            year: new FormControl(this.anoActual, [Validators.required]),
            semester: new FormControl("", [Validators.required]),
            status: new FormControl("", [Validators.required]),
          });
    }

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
    openEditDialog(id){
        let dialogRef = this.dialog.open(EditProjectComponent, {
            width: '850px',
            data: id,
            disableClose: true,
            autoFocus: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            this.dialogResult = result;
            if (result == 'Confirm') {
                this.toastr.success('Proyecto modificado exitosamente', 'Notificación', { timeOut: 3000 });
                this.loadProjects();
            }
        })
    }

    verProyecto(id){
        this.router.navigateByUrl('/proyectos/gestion/' + id);
    }

    terminarProyecto(id, modal, event){
        event.target.parentElement.parentElement.blur();
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
            .result.then((result) => {
                this.projectsService.endProject(id).subscribe((data:any) => {
                    this.toastr.success('Proyecto eliminado correctamente', 'Notificación de eliminación', { timeOut: 3000 });
                    this.loadProjects();
                    console.log("proyecto terminado");
                });
            }, (reason) => {
            });
        
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
