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
import { InstitucionService } from 'src/app/_services/institucion.service';

@Component({
  selector: 'app-add-institucion',
  templateUrl: './add-institucion.component.html',
  styleUrls: ['./add-institucion.component.scss']
})
export class AddInstitucionComponent implements OnInit {

  form: FormGroup;
  hide = true;
  cargando = false;
  usuarios: any;

  constructor(
    public dialogRef: MatDialogRef<AddInstitucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private institucionService: InstitucionService) {
    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      razon_social: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.institucionService.getAll().subscribe(
      (resp: any) => {
        this.usuarios = resp;
      }
    );
  }

  onCloseConfirm() {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    let userData = this.form.value;
    
    this.institucionService.insert(userData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close('Confirm');
      },
      error: result => {
        console.log('Error: ' + result);
      }
    });
  }

  onCloseCancel() {
    this.dialogRef.close("Cancel");
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

}
