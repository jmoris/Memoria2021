import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/_services/cursos.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { NgbTab, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

    displayedColumns: string[] = ["matricula", "name", "rut", "email", "rol"];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    id: any;
    loading: boolean;
    curso: any;
    users: any = [];
    fileToUpload: File = null;
    carga: any;
    addStudentModal;
    estudiantes: any = [];
    estudianteAgregar: any;

    @ViewChild('infoImportModal') modalRef: TemplateRef<any>;
    stats: any = {
        students: 0,
        teachers: 1,
        supports: 0
    };



    constructor(
        private route: ActivatedRoute,
        private cursoService: CursosService,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private usuariosService: UsuariosService,
    ) {
        this.loading = true;
        //this.dataSource.sortingDataAccessor = this.sortingCustomAccesor;
        ////
        this.id = this.route.snapshot.params['id'];
        this.stats = {
            students: 0,
            teachers: 1,
            supports: 0
        };
        this.cursoService.get(this.id).subscribe((data: any) => {
            this.curso = data[0];

            this.users = this.users.concat(data[0].profesor);
            this.cursoService.usersList(this.id).subscribe((userData: any) => {
                console.log("datos", userData);

                this.users = this.users.concat(userData);
                this.dataSource.data = this.users;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.stats.students = userData.length;
            console.log(this.users);

            })
        });

        this.usuariosService.getStudents().subscribe(
            data => {
                if (!data) {
                  return;
                }
            this.estudiantes = data;

            }
            
        );
        this.loading = false;
        
    }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    sortingCustomAccesor = (item, property) => {
        switch (property) {
            case 'rut': return item.rut;
            case 'name': return item.name;
            case 'lastname': return item.lastname;
            case 'email': return item.email;
            case 'rol': return item.pivot.role_id;
            default: return item[property];
        }
    };

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    loadData() {
        this.loading = true;
        this.users = [];
        this.stats = {
            students: 0,
            teachers: 1,
            supports: 0
        };
        console.log(this.curso);
        this.cursoService.usersList(this.id).subscribe((userData: any) => {
            this.users = this.users.concat(userData);
            this.dataSource.data = this.users;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            ////
            this.stats.students = userData.length;
            //this.users.push(this.curso.user);
            //this.users = this.users.concat(userData);
        })
        this.loading = false;

    }

    handleFileInput(files: FileList, modal) {
        this.fileToUpload = files.item(0);
        this.cursoService.uploadFile(this.fileToUpload, this.id).subscribe((data: any) => {
            this.fileToUpload = null;
            if (!data.success) {
                this.toastr.error(data.msg, 'Notificación de error', { timeOut: 3000 });
                return;
            }
            this.toastr.success(data.msg, 'Notificación de exito', { timeOut: 3000 });
            this.carga = data;
            this.modalService.open(this.modalRef, { backdropClass: 'light-blue-backdrop' });
            this.loadData();
        });
    }

    ngOnInit(): void {
    }

    formatRol(value) {
        switch (value) {
            case 1:
                return 'Superadministrador';
            case 2:
                return 'Administrador';
            case 3:
                return 'Profesor';
            case 4:
                return 'Estudiante';
        }
    }

    addStudent(modal,event)
    {
        //event.target.parentElement.parentElement.blur();
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).
        result.then((result) => {
            console.log('estuidante: ');
            console.log(this.estudianteAgregar);
        });
    }

    onCloseConfirm(modal){
        console.log(this.estudianteAgregar);

        var splitted = this.estudianteAgregar.split(" "); 
        var correo = splitted[splitted.length - 1];
        console.log(correo);
        var idEstudiante;
        for (let estudiante of this.estudiantes) {
            if(estudiante.email==correo)
            {
                idEstudiante = estudiante.id;
            }
        }

        console.log(idEstudiante);
        this.cursoService.addSingleUser(idEstudiante,this.id).subscribe( (data) => { 
            this.loadData();
            modal.close();
        });
    }

deleteEstudent(emailToDelete)
{
    
    var idEstudiante;
    for (let estudiante of this.estudiantes) {
        if(estudiante.email==emailToDelete)
        {
            idEstudiante = estudiante.id;
        }
    }
    console.log(emailToDelete + "  " +idEstudiante  + " " + this.id);

    this.cursoService.deleteFromCourse(idEstudiante,this.id).subscribe(
        (data) => { 
            this.loadData();
         });
}


}
