
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from 'src/app/_services/cursos.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/model-classes/course';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../../core/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { AddAssistantTeacherComponent } from '../add-assistant-teacher/add-assistant-teacher.component';
import { AddAssistantStudentComponent } from '../add-assistant-student/add-assistant-student.component';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {
  cursos: any;
  checked = true;
  loading = false;
  dialogResult = "";
  courses: Course[];
  displayedColumns: string[] = ["name", "year", "semester", "edit", "delete"];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();


  addCourseForm = this.fb.group({
    name: ['', Validators.required],
    year: ['', Validators.required],
    semester: ['', Validators.required],
    teacher: ['', Validators.required]
  });

  addGuestTeacherForm = this.fb.group({
    course: ['', Validators.required],
    guestTeacher: ['', Validators.required]
  });

  addHelperForm = this.fb.group({
    course: ['', Validators.required],
    helper: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cursosService: CursosService,
    private fb: FormBuilder,
  ) { }

  getCourses() {
    this.loading = true;
    this.cursosService.getAll().subscribe(
      data => {
        if (!data) {
          return;
        }
        console.log("datos", data);
        this.courses = data;
        this.dataSource.data = this.courses;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });

  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sortingCustomAccesor = (item, property) => {
    switch (property) {
      case 'name': return item.name;
      case 'year': return item.year;
      case 'semester': return item.semester;
      default: return item[property];
    }
  };

  ngOnInit() {
    this.dataSource.sortingDataAccessor = this.sortingCustomAccesor;
    this.getCourses();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  deleteCourse(id: string) {
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      console.log(confirmation);
      if (confirmation.confirmed) {
        this.cursosService.delete(id).subscribe({
          next: result => {
            console.log(result);
            this.getCourses();
            this.toastr.success('Curso eliminado correctamente', 'Notificación', { timeOut: 3000 });
          },
          error: result => {
            console.log(result);
          }
        });
      }
    });
  }

  openDeletionConfirmationDialog() {
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar este curso?' };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.loading = true;
    this.cursosService.getAll().subscribe(
      (resp: any) => {
        this.cursos = resp;
        this.loading = false;
        console.log(this.cursos);
      }
    );
  }

  addCourse(modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.checked = true;
        var frm = this.addCourseForm.value;
        this.cursosService.insert(frm).subscribe((resp: any) => {
          if (resp.errors) {
            this.toastr.error('No se puede insertar el curso en la base de datos.', 'Notificación de error', { timeOut: 3000 });
            return;
          }
          this.toastr.success('Curso insertado correctamente', 'Notificación de inserción', { timeOut: 3000 });
          this.cleanForm();
          this.loadData();
        }, (error: any) => {
          console.log(error);
        });
      }, (reason) => {
      });
  }

  cleanForm() {
    this.addCourseForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      semester: ['', Validators.required],
      teacher: ['', Validators.required]
    });
  }

  addGuestTeacher(modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  addHelper(modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  openAddAsistantTeacher(): void {
    let dialogRef = this.dialog.open(AddAssistantTeacherComponent, {
      width: '500px',
      data: 'This text is passed into the dialog',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      if (result == 'Confirm') {
        this.toastr.success('Profesor huésped asignado correctamente', 'Notificación', { timeOut: 3000 });
      }
    })
  }

  openAddAsistantStudent(): void {
    let dialogRef = this.dialog.open(AddAssistantStudentComponent, {
      width: '500px',
      data: 'This text is passed into the dialog',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      if (result == 'Confirm') {
        this.toastr.success('Ayudante asignado correctamente', 'Notificación', { timeOut: 3000 });
      }
    })
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(AddCourseComponent, {
      width: '850px',
      data: 'This text is passed into the dialog',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      if (result == 'Confirm') {
        this.toastr.success('Curso agregado exitosamente', 'Notificación', { timeOut: 3000 });
        this.getCourses();
      }
    })
  }

  editCourse(id: String) {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: id,
      width: '850px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == 'Confirm') {
        this.getCourses();
        this.toastr.success('Curso editado exitosamente', 'Notificación', { timeOut: 3000 });
      }
    });
  }

  deleteData(id, modal, event) {
    event.target.parentElement.parentElement.blur();
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.cursosService.delete(id)
          .subscribe(res => {
            this.toastr.success('Curso eliminado correctamente', 'Notificación de eliminación', { timeOut: 3000 });
            this.loadData();
          })
      }, (reason) => {
      });
  }

  formatSemester(value) {
    switch (value) {
      case 1:
        return 'Otoño';
      case 2:
        return 'Primavera';
    }
  }

  formatProfile(value) {
    switch (value) {
      case 'teacher':
        return 'Docente';
      case 'student':
        return 'Estudiante';
      case 'admin':
        return 'Administrador';
    }
  }
  
  filtrarDatos(value){
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
