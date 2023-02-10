import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/_services/projects.service';
import { MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment/moment';
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MdRenderService } from '@nvxme/ngx-md-render';
import { IssuesComponent } from './issues/issues.component';
import { UserActivityComponent } from './user-activity/user-activity.component';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})


export class ProjectComponent implements AfterViewInit {
    private readonly notifier: NotifierService;

    active = 1;
    name = "nombreProyecto";
    chartPie1: any;
    chartLineOption3: any;
    products$: any;
    dialogResult = "";
    items = ['Javascript', 'Typescript'];
    autocompletes$;
    tagsCtrl1 = new FormControl(this.items);
    loading: boolean = false;
    id: any;
    proyecto: any = 'Proyecto';
    repositorio: any = '-';
    equipo: any = [];
    commits: any = [];
    issues: any = [];
    softreqs: any = [];
    testcases: any = [];
    roles: any = [];
    usuarios: any = [];

    maatReport : any = [];
    klocReport : any = [];
    klocResumen: any;
    hasWiki: boolean = false;
    boards: any = 0;

    infocommits: any = 0;
    infoissues: any = 0;
    infobranches: any = 0;
    rol: any;
    private modalAdd: NgbModalRef;

    selectedUser: any;
    selectedRol: any;

    addStudentModal;
    estudiantes: any = [];
    colaboradores: any = [];
    branches: any = [];
    estudianteAgregar: any;
    selectedColaborador: any;
    entityComplexity: any = {entyty:''};

    displayedColumns: string[] = ["name", "last_update", "author", "message"];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns2: string[] = ["title", "login", "created_at", "comments"];
    dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort2: MatSort;
    @ViewChild(MatPaginator) paginator2: MatPaginator;

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    public chartOptions2: Partial<ChartOptions>;

    public chartOptions3: Partial<ChartOptions>;
    hoveredDate: NgbDate | null = null;

    

    fromDate2: NgbDate | null;
    toDate2: NgbDate | null;

    createdDate : any;
    fchCreacion: any;

    source: string = "";
    rendered: SafeHtml;
    git_tree: SafeHtml;
    wikiFiles: string[] = [];
    file:string;
    lastWikiFileUpdated:any;
    tableros: any = [];
    tablero: any;
    colTablero: any;
    form: FormGroup;
    form2: FormGroup;
    branchForm: FormGroup;

    currentUser : any;
    isAlumno : boolean = false;

    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      });

    public constructor(
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private dl: DataLayerService,
        private toastr: ToastrService,
        private dialog: MatDialog,
        private proyectoService: ProjectsService,
        private authService: AuthenticationService,
        private usersService: UsuariosService,
        private calendar: NgbCalendar, 
        public formatter: NgbDateParserFormatter,
        private sanitizer: DomSanitizer,
        private mdRender: MdRenderService,
        private changeDetection: ChangeDetectorRef,
        private router: Router
    ) {
        
        this.loading = true;
        this.wikiFiles = [];
        this.id = this.route.snapshot.params['id'];
        this.fromDate2 = calendar.getToday();
        this.toDate2 = calendar.getNext(calendar.getToday(), 'm', 1);

        let html = this.mdRender.render('');
        this.rendered = this.sanitizer.bypassSecurityTrustHtml(html);

        this.form = new FormGroup({
            tablero: new FormControl('', [Validators.required]),
        });
        this.form2 = new FormGroup({
            status: new FormControl(0, [Validators.required]),
        });
        this.branchForm = new FormGroup({
            branch: new FormControl('', [Validators.required]),
        });

        this.currentUser = authService.currentUserValue;
        if(this.currentUser.role == 'Alumno'){
            this.isAlumno = true;
        }

        this.usersService.testGithub().subscribe((data:any) => {
            if(data.status == 500){
                this.toastr.warning('Las credenciales de Github son invalidas.', 'Notificación', { timeOut: 3000 });
                this.router.navigateByUrl('proyectos/gestion');
            }
            console.log(data);
        });

        proyectoService.getInfoProject(this.id).subscribe((data) => {
            this.proyecto = data.nombre;
            this.repositorio = data.autor + '/' + data.nombre;
            this.infoissues = data.issues;
            this.infobranches = data.branches;
            console.log("Branches");
            console.log(data.branches);
            this.infocommits = data.ncommits;
            this.hasWiki = data.has_wiki;
            this.boards = data.proyectos;
            this.equipo = data.collabs;
            this.commits = data.commits;
            this.fchCreacion = data.created_date;
            let fecha = moment(data.created_date).format('DD-MM-YYYY').split('-');
            this.createdDate = new NgbDate(parseInt(fecha[2]), parseInt(fecha[1]), parseInt(fecha[0]));
            this.fromDate2 = new NgbDate(parseInt(fecha[2]), parseInt(fecha[1]), parseInt(fecha[0]));
            this.toDate2 = calendar.getNext(this.fromDate2, 'm', 1);
            this.loading = false
        }, (error:any) => {
            this.toastr.error('No se pudo obtener la información desde Github, vuelva a intentarlo mas tarde.', 'Notificación', { timeOut: 3000 });
            this.router.navigateByUrl('proyectos/gestion');
        });

        proyectoService.getMaatReport(this.id).subscribe((data) => {
            this.maatReport = data;
        });
        
        proyectoService.getTableros(this.id).subscribe((data) => {
            this.tableros = data;
        });

        proyectoService.getWIKIFiles(this.id).subscribe((data) => {
            if(data.files.length > 0){
                this.wikiFiles = data.files;
                this.proyectoService.getWIKIFile(this.id, data.files[0]).subscribe((data) => {
                    let html = this.mdRender.render(data);
                    this.rendered = this.sanitizer.bypassSecurityTrustHtml(html);
                });
                this.lastWikiFileUpdated = data.last_update;
            }else{
                let html = this.mdRender.render('<h2>Sin contenido. </h2>');
                this.rendered = this.sanitizer.bypassSecurityTrustHtml(html);
            }
        });

        proyectoService.getGitTree(this.id).subscribe((data) => {
            this.git_tree = data;
        });

        proyectoService.getUsersFromProject(this.id).subscribe((data) => {
            this.estudiantes = data;
        });
        proyectoService.getColaboradoresFromProject(this.id).subscribe((data) => {
            this.colaboradores = data;
        });

        proyectoService.getBranchesInfo(this.id).subscribe((data) => {
            this.branches = data;
            this.dataSource.data = this.branches;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });

        proyectoService.getKlocReport(this.id).subscribe((data) => {
            this.klocReport = data.data;
            this.klocResumen = data.resumen;
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
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    changeBranch(){
        this.loading = true;
        this.proyectoService.getBranchCommits(this.id, this.branchForm.controls['branch'].value).subscribe((data:any) => {
            this.commits = data;
            this.infocommits = data.length;
            this.loading = false;
        });
    }


    getMDFile(file){
        this.proyectoService.getWIKIFile(this.id, file).subscribe((data) => {
            let html = this.mdRender.render(data);
            this.rendered = this.sanitizer.bypassSecurityTrustHtml(html);
        });
    }

    openIssuesDialog(){
        let dialogRef = this.dialog.open(IssuesComponent, {
            width: '900px',
            data: this.id,
            disableClose: true,
            autoFocus: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
        })
    }
    openUserActivityDialog(miembro){
        let dialogRef = this.dialog.open(UserActivityComponent, {
            width: '900px',
            data: {id:this.id, miembro:miembro},
            disableClose: true,
            autoFocus: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
        })
    }
    onTableroChange(e){
        this.loading = true;
        this.proyectoService.getTablero(e.value).subscribe((data) => {
            this.tablero = data;
            this.loading = false;
            this.changeDetection.detectChanges();
        });
    }
    loadData() {
        this.loading = true;
        this.loading = true;
        this.id = this.route.snapshot.params['id'];
        
        this.proyectoService.getInfoProject(this.id).subscribe((data) => {
            this.proyecto = data.nombre;
            this.repositorio = data.autor + '/' + data.nombre;
            this.infoissues = data.issues;
            this.infobranches = data.branches;
            this.infocommits = data.ncommits;
            this.equipo = data.collabs;
            this.commits = data.commits;
        });

        this.proyectoService.getUsersFromProject(this.id).subscribe((data) => {
            this.estudiantes = data;
        });
        this.proyectoService.getColaboradoresFromProject(this.id).subscribe((data) => {
            this.colaboradores = data;
        });

        this.proyectoService.getBranchesInfo(this.id).subscribe((data) => {
            this.branches = data;
            this.dataSource.data = this.branches;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });

        this.proyectoService.getKlocReport(this.id).subscribe((data) => {
            this.klocReport = data.data;
            this.klocResumen = data.resumen;
        });
        this.proyectoService.getMaatReport(this.id).subscribe((data) => {
            this.maatReport = data;
            this.loading = false
        });

    }

    public onSelect(item) {
        console.log('tag selected: value is ' + item);
    }

    analizar(){
        this.loading = true;
        this.proyectoService.analyzeProject(this.id).subscribe((data) => {
            console.log(data);
            this.loading = false;
            this.loadData();
        });
    }

    complexityAnalysis(modal, filename){
        this.proyectoService.getComplexityAnalysis(this.id, filename).subscribe((data) => {
            this.entityComplexity = data;
            this.entityComplexity.entity = filename;
            this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
        });
    }

    generarReporte(){
        let currentUser = this.authService.currentUserValue;
        if(currentUser.role == 'Administrador' || currentUser.role == 'Profesor' || currentUser.role == 'Superadministrador'){
            this.reporteProyecto();
        }else{
            this.reporteUsuario(currentUser.user.id);
        }
    }

    reporteUsuario(user_id){
        this.loading = true;
        this.proyectoService.reporteUsuario(this.id, user_id).subscribe((resp) => {
            const byteArray = new Uint8Array(atob(resp.pdf).split('').map(char => char.charCodeAt(0)));
            let blob = new Blob([byteArray], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            // i.e. display the PDF content via iframe
            //location.href = url;
            this.loading = false;
            window.open(url, "_blank");
        }, (error:any) => {
            this.loading = false;
            this.toastr.error('No se pudo obtener la información desde Github, vuelva a intentarlo mas tarde.', 'Notificación', { timeOut: 3000 });
        });
    }

    reporteProyecto(){
        this.loading = true;
        this.proyectoService.reporteProyecto(this.id).subscribe((resp) => {
            const byteArray = new Uint8Array(atob(resp.pdf).split('').map(char => char.charCodeAt(0)));
            let blob = new Blob([byteArray], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            // i.e. display the PDF content via iframe
            //location.href = url;
            this.loading = false;
            window.open(url, "_blank");
        }, (error:any) => {
            this.loading = false;
            this.toastr.error('No se pudo obtener la información desde Github, vuelva a intentarlo mas tarde.', 'Notificación', { timeOut: 3000 });
        });
    }

    openActivityModal(modal, user){
        this.selectedUser = user;
        this.proyectoService.getUserActivity(this.id, user.name, this.formatDateNgb(this.createdDate), this.formatDateNgb(this.toDate2)).subscribe((data:any) => {
            console.log(data);
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
        });
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
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

    sortingCustomAccesor = (item, property) => {
        switch (property) {
            case 'name': return item.name;
            case 'author': return item.author;
            case 'last_update': return item.last_update;
            case 'message': return item.message;
            default: return item[property];
        }
    };
    
    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    
    ngOnInit() {
        this.dataSource.sortingDataAccessor = this.sortingCustomAccesor;
    }

    changeUsuarioModal(e){
        this.selectedUser = e;
    }

    changeRolModal(e){
        this.selectedRol = e;
    }

    addSingleUser(modal, event){
        event.target.parentElement.parentElement.blur();
        this.modalAdd = this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    }

    onCloseSingleUser(modal){
        this.proyectoService.addSingle(this.id, this.selectedUser).subscribe((data) => {
            this.loadData();
            this.modalAdd.close();
        });
    }


    openAddDialog() {
        const dialogRef = this.dialog.open(EditProjectComponent, {
            width: '850px',
            data: 'This text is passed into the dialog',
            disableClose: true,
            autoFocus: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            this.dialogResult = result;
            // tslint:disable-next-line: triple-equals
            if (result == 'Confirm') {
                this.toastr.success('Proyecto agregado exitosamente', 'Notificación', { timeOut: 3000 });
            }
        });
    }

    openDeletionConfirmationDialog(title) {
        var deletionDialogConfig = this.getDialogConfig();
        deletionDialogConfig.data = { message: '¿Desea eliminar este ' + title + '?' };
        return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
    }

    getDialogConfig() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        return dialogConfig;
    }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}

deleteMember(member_email,role)
{
    console.log("sadas");
    var idEstudiante;
    for (let estudiante of this.equipo) {
        if(estudiante.email==member_email)
        {
            idEstudiante = estudiante.id;
        }
    }

    var idRol;
    for (let rolb of this.roles) {
        if(rolb.name==role)
        {
            idRol = rolb.id;
        }
    }
    this.proyectoService.deleteUserFromProject(idRol,idEstudiante,this.id).subscribe
    (
        (data) =>
        {
           this.loadData();
        });

}

addStudent(modal,gh_user,event){
    this.selectedColaborador = gh_user;
    //event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).
    result.then((result) => {
        console.log("aweasd:" + this.estudianteAgregar);
    });
}

deleteStudent(modal, gh_user, event){
    let user = this.getColaborador(gh_user);
    console.log(user);
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).
    result.then((result) => {
        console.log(result);
        if(result == 'Ok'){
            this.proyectoService.detachColaborador(this.id, user.id, gh_user).subscribe((data) => {
                this.loadData();
            });
        }
    });
}

openBranchesModal(modal, event){
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).
    result.then((result) => {
        console.log("aweasd:" + this.estudianteAgregar);
    });
}

openIssuesModal(modal, event){
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).
    result.then((result) => {
        console.log("issues:" + this.estudianteAgregar);
    });
}

onCloseConfirm(modal){

    var splitted = this.estudianteAgregar.split(" "); 
    var correo = splitted[splitted.length - 1];
    var idEstudiante;
    for (let estudiante of this.estudiantes) {
        if(estudiante.email==correo)
        {
            idEstudiante = estudiante.id;
        }
    }

    this.proyectoService.addColaborador(this.id,idEstudiante,this.selectedColaborador).subscribe( (data) => { 
        this.loadData();
        modal.close();
    });
}

formatDate(date) {
    return moment(date).format('DD-MM-YYYY');
}

getUserColaborador(gh_user){
    let user = null;
    this.colaboradores.forEach(element => {
        if(element.pivot.gh_user == gh_user){
            user = element;
        }
    });
    return user.name + " " + user.lastname;
}

existColaborador(gh_user){
    let valido = false;
    this.colaboradores.forEach(element => {
        if(element.pivot.gh_user == gh_user){
            valido = true;
        }
    });
    return valido;
}

getColaborador(gh_user){
    let user: any;
    this.colaboradores.forEach(element => {
        if(element.pivot.gh_user == gh_user){
            user = element;
        }
    });
    return user;
}

formatUrgency(value) {
    console.log("VALUE", value);
    if (value == 1) {
        return 'Urgente'
    }
    else if (value == 2) {
        return 'Normal'
    } else {
        return 'Si se puede'
    }
}



  onUserDateSelection(date: NgbDate) {
    if (!this.fromDate2 && !this.toDate2) {
      this.fromDate2 = date;
    } else if (this.fromDate2 && !this.toDate2 && date && date.after(this.fromDate2)) {
      this.toDate2 = date;
    } else {
      this.toDate2 = null;
      this.fromDate2 = date;
    }
    if(this.fromDate2 != null && this.toDate2 != null){
        this.proyectoService.getUserActivity(this.id, this.selectedUser.name, this.formatDateNgb(this.fromDate2), this.formatDateNgb(this.toDate2)).subscribe((data:any) => {
            console.log(data);
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
        });
    }
  }

  onLoadingChange(event){
    this.loading = event;
    console.log(event);
  }
}

