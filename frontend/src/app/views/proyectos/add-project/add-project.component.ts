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
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {


  form: FormGroup;
  seleccionarForm: FormGroup;
  hide = true;
  isCompleted: boolean;
  asignarForm: FormGroup;
  currentYear: number = new Date().getFullYear();;
  roles: any = [];
  cursos: any = [];
  estudiantes: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>();
  isDataLoading: boolean;
  selected = [];
  displayedColumns: string[] = ['select', 'name', 'lastname', 'email'];
  displayedColumns2: string[] = ['name', 'lastname', 'email', 'rol'];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selection = new SelectionModel<any>(true, []);

  @ViewChild('sort1') sort: MatSort;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private projectService: ProjectsService,
    private userService: UsuariosService,
    private formBuilder: FormBuilder,
    private cursosService: CursosService
  ) {
    // tslint:disable-next-line: no-shadowed-variable
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
    // tslint:disable-next-line: no-shadowed-variable
    this.projectService.getRoles().subscribe((data) => {
      this.roles = data;
    });
    this.cursosService.getAll(1).subscribe((data) => {
      this.cursos = data;
    });
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      year: new FormControl(this.currentYear, [Validators.required]),
      semester: new FormControl("", [Validators.required]),
      url: new FormControl("", [Validators.required, Validators.pattern('(https:\/\/)github.com[:/](.*).git')]),
      course: new FormControl("", [Validators.required]),
    });
    this.seleccionarForm = new FormGroup({
      usuarios: new FormArray([], [])
    });
  }


  ngOnInit(): void {
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  }

  onStep1Next(e) { }

  onComplete(e) {
    const frm = this.form.value;
    frm.students = this.seleccionarForm.value.usuarios;
    console.log(frm);
    this.projectService.insertComplete(frm).subscribe((data) => {
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
      const usersControl = <FormArray>this.seleccionarForm.controls.usuarios;
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.estudiantes.forEach(element => {
        usersControl.push(this.formBuilder.group({ user_id: element.id }));
      });

    }
  }

  seleccionar(row) {
    const usersControl = <FormArray>this.seleccionarForm.controls.usuarios;
    const selected = this.selection.isSelected(row);
    if (selected) {
      usersControl.push(this.formBuilder.group({ user_id: row.id }));
    } else {
      usersControl.removeAt(usersControl.value.findIndex(student => student.id === row.id));
    }
  }

  searchById(id) {
    const usuarios: any = this.seleccionarForm.controls.usuarios.value;
    let search: any = null;
    usuarios.forEach(element => {
      if (element.user_id == id) {
        search = element;
      }
    });
    return search;;
  }

  selectRol(user, rol) {
    const searched = this.searchById(user.id);
    searched.role_id = rol.id;
    const usersControl = <FormArray>this.asignarForm.controls.usuarios;
    usersControl.push(this.formBuilder.group({
      user_id: new FormControl(searched.user_id, [Validators.required]),
      role_id: new FormControl(searched.role_id, [Validators.required])
    }));
  }
  
  filtrarEstudiantes(value){
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
