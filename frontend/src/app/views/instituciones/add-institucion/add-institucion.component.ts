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

@Component({
  selector: 'app-add-institucion',
  templateUrl: './add-institucion.component.html',
  styleUrls: ['./add-institucion.component.scss']
})
export class AddInstitucionComponent implements OnInit {

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
  displayedColumns: string[] = ["select", "name", "surname", "email"];
  displayedColumns2: string[] = ["name", "surname", "email", "rol"];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selection = new SelectionModel<any>(true, []);
  teachers: any = [];
  @ViewChild('sort1') sort: MatSort;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<AddInstitucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private cursosService: CursosService,
    private userService: UsuariosService,
    private formBuilder: FormBuilder
  ) {

    this.userService.getStudents().subscribe((data) => {
      if (!data) {
        return;
      }
      data.forEach(element => {
          if(element.active){
              this.estudiantes.push(element);
          }
      });
      this.dataSource.data = this.estudiantes;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isDataLoading = false;
    });
    this.userService.getTeachers().subscribe((data) => {
      this.teachers = data;
      console.log("Datos: ", this.teachers);
    });
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      teacher_id: new FormControl("", [Validators.required]),
      year: new FormControl(this.currentYear, [Validators.required]),
      semester: new FormControl("", [Validators.required]),
    });
    this.seleccionarForm = new FormGroup({
        usuarios: new FormArray([], [])
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
    frm.students = this.seleccionarForm.controls.usuarios.value;
    this.cursosService.insertComplete(frm).subscribe((data) => {
      console.log(data);
      this.dialogRef.close('Confirm');
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.seleccionarForm.controls.usuarios.setValue([]);
      this.selection.clear();
    } else {
      let usersControl = <FormArray>this.seleccionarForm.controls.usuarios;
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.estudiantes.forEach(element => {
        usersControl.push(this.formBuilder.group({ user_id: element.id }));
      });

    }
  }

  seleccionar(row) {
    let usersControl = <FormArray>this.seleccionarForm.controls.usuarios;
    let selected = this.selection.isSelected(row);
    if (selected) {
      usersControl.push(this.formBuilder.group({ user_id: row.id }));
    } else {
      usersControl.removeAt(usersControl.value.findIndex(student => student.id === row.id))
    }
  }

}
