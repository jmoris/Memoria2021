import { Component, OnInit, Inject, ViewChild, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/_services/projects.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CursosService } from 'src/app/_services/cursos.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  form: FormGroup;
  seleccionarForm: FormGroup;
  hide = true;
  isCompleted: boolean;
  asignarForm: FormGroup;
  currentYear: number = new Date().getFullYear();;
  estudiantes: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>();
  isDataLoading: boolean;
  selected = [];
  displayedColumns: string[] = ["select", "name", "lastname", "email"];
  displayedColumns2: string[] = ["name", "lastname", "email", "rol"];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selection = new SelectionModel<any>(true, []);
  teachers: any = [];
  userRole = null;
  userId = null;

  @ViewChild('sort1') sort: MatSort;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private cursosService: CursosService,
    private userService: UsuariosService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.userRole = this.authService.getUserType();
    this.userId = this.authService.currentUserValue.user.id;

    this.userService.getTeachers().subscribe((data) => {
      this.teachers = data;
      console.log("Datos: ", this.teachers);
    });
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      teacher_id: new FormControl(this.userId, [Validators.required]),
      year: new FormControl(this.currentYear, [Validators.required]),
      semester: new FormControl("", [Validators.required]),
    });
  }


  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

  onStep1Next(e) { }

  onComplete(e) {
    let frm = this.form.value;
    frm.students = [];
    this.cursosService.insertComplete(frm).subscribe((data) => {
      console.log(data);
      this.dialogRef.close('Confirm');
    });
  }

}
