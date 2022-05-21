import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectsService } from 'src/app/_services/projects.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { CursosService } from 'src/app/_services/cursos.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {


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

  idProyecto : any;

  @ViewChild('sort1') sort: MatSort;
  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public id: String,
    private projectService: ProjectsService,
    private userService: UsuariosService,
    private formBuilder: FormBuilder,
    private cursosService: CursosService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      year: new FormControl(this.currentYear, [Validators.required]),
      semester: new FormControl("", [Validators.required]),
      url: new FormControl("", [Validators.required]),
      course: new FormControl("", [Validators.required]),
    });
    this.seleccionarForm = new FormGroup({
      usuarios: new FormArray([], [])
    });
    
    this.idProyecto = id;
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

          projectService.get(id).subscribe((data:any) => {
            this.form = new FormGroup({
              name: new FormControl(data.nombre, [Validators.required]),
              description: new FormControl('', []),
              year: new FormControl(data.ano, [Validators.required]),
              semester: new FormControl(data.semestre, [Validators.required]),
              url: new FormControl(data.repositorio.url, [Validators.required]),
              course: new FormControl(data.curso_id, [Validators.required]),
            });
            const usersControl = <FormArray>this.seleccionarForm.controls.usuarios;
            this.estudiantes.forEach(est => {
              data.usuarios.forEach(element => {
                if(est.id == element.id){
                  this.selection.select(est);
                  usersControl.push(this.formBuilder.group({ user_id: element.id }));
                }
              });
            });
            
            this.isDataLoading = false;
      
          });
    });

    

    // tslint:disable-next-line: no-shadowed-variable
    this.projectService.getRoles().subscribe((data) => {
      this.roles = data;
    });
    this.cursosService.getAll().subscribe((data) => {
      this.cursos = data;
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
    this.projectService.update(frm, this.idProyecto).subscribe((data) => {
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
    console.log(row);
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
