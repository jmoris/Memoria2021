import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/_services/cursos.service';
import { InstitucionService } from 'src/app/_services/institucion.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-edit-institucion',
  templateUrl: './edit-institucion.component.html',
  styleUrls: ['./edit-institucion.component.scss']
})
export class EditInstitucionComponent implements OnInit {

  title: String;
  hide = true;
  loading: boolean;

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    razon_social: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditInstitucionComponent>,
    private institucionService: InstitucionService,
    @Inject(MAT_DIALOG_DATA) private data) {
    this.title = "Editar institución";
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    this.loading = true;
    this.institucionService.get(this.data).subscribe({
      next: (result:any) => {
        console.log(result);
        this.form.get('nombre').setValue(result.nombre);
        this.form.get('razon_social').setValue(result.razon_social);
        this.loading = false;
      }, error: result => {
        console.log(result);
      }
    });
  }

  onCloseCancel(): void {
    this.dialogRef.close('Cancel');
  }

  onCloseConfirm() {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    let userData = this.form.value;


    this.institucionService.update(this.data, userData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close('Confirm');

      },
      error: result => {
        console.log(result);
      }
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };
}
