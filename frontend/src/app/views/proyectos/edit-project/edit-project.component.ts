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
  currentYear: number = new Date().getFullYear(); ;
  roles: any = [];
  estudiantes: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>();
  isDataLoading: boolean;
  selected = [];
  displayedColumns: string[] = [ 'select', 'name', 'surname', 'email'];
  displayedColumns2: string[] = [ 'name', 'surname', 'email', 'rol'];
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
    private formBuilder: FormBuilder
  ) {
    this.userService.getStudents().subscribe((data) => {
        if (!data) {
            return;
          }
          this.estudiantes = data;
          this.dataSource.data = this.estudiantes;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isDataLoading = false;
    });
    this.projectService.getRoles().subscribe((data) => {
        this.roles = data;
    });
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      year: new FormControl(this.currentYear, [Validators.required]),
      semester: new FormControl('', [Validators.required]),
    });
    this.seleccionarForm = new FormGroup({
        usuarios: new FormArray([], [Validators.required, Validators.minLength(1)])
    });
    this.asignarForm = new FormGroup({
        usuarios: new FormArray([], [Validators.required, Validators.minLength(this.dataSource2.data.length)])
      });
  }


  ngOnInit(): void {
  }

  onCloseConfirm() {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach((control: { markAsTouched: () => void; }) => {
        control.markAsTouched();
      });
      return;
    }
    const projectData = this.form.value;
    console.log('Info name: ' + projectData.name);
    this.projectService.insert(projectData).subscribe({
      next: result => {
        console.log(result);

      },
      error: result => { }
    });
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  }

  onStep1Next(e: any) {}
  onStep2Next(e: any) {
    this.dataSource2.data = this.selection.selected;
    this.dataSource2.sort = this.sort2;
    this.dataSource2.paginator = this.paginator2;
    this.asignarForm = new FormGroup({
        usuarios: new FormArray([], [Validators.required, Validators.minLength(this.dataSource2.data.length)])
      });
  }

  onComplete(e: any) {
      const frm = this.form.value;
      frm.students = this.asignarForm.value.usuarios;
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
        this.estudiantes.forEach((element: { id: any; }) => {
            usersControl.push(this.formBuilder.group({user_id: element.id}));
        });

    }
  }

  seleccionar(row: { id: any; }) {
    const usersControl = <FormArray>this.seleccionarForm.controls.usuarios;
    const selected = this.selection.isSelected(row);
    if (selected) {
        usersControl.push(this.formBuilder.group({user_id: row.id}));
    } else {
        usersControl.removeAt(usersControl.value.findIndex((student: { id: any; }) => student.id === row.id));
    }
  }

  searchById(id: any) {
    const usuarios: any = this.seleccionarForm.controls.usuarios.value;
    let search: any = null;
    usuarios.forEach((element: { user_id: any; }) => {
        // tslint:disable-next-line: triple-equals
        if (element.user_id == id) {
            search = element;
        }
    });
    return search; ;
  }

    selectRol(user: { id: any; }, rol: { id: any; }) {
        const searched = this.searchById(user.id);
        searched.role_id = rol.id;
        const usersControl = <FormArray>this.asignarForm.controls.usuarios;
        usersControl.push(this.formBuilder.group({
            user_id: new FormControl(searched.user_id, [Validators.required]),
            role_id: new FormControl(searched.role_id, [Validators.required])
        }));
    }

}
