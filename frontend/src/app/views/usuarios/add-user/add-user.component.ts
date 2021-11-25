import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;
  hide = true;
  cargando = false;
  usuarios: any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private usersService: UsuariosService) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      rut: new FormControl("", [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/), this.checkVerificatorDigit]),
      enrollment: new FormControl("", [Validators.required, Validators.pattern(/^\d+$/)]),
      role: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.usersService.getAll().subscribe(
      (resp: any) => {
        this.usuarios = resp;
      }
    );
  }


  checkVerificatorDigit(control: AbstractControl) {
    let run = control;
    if (run.value == "") return null;
    var runClean = run.value.replace('.', '');
    runClean = runClean.replace('-', '');

    let body = runClean.slice(0, -1);
    let dv = runClean.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= body.length; i++) {
      let index = multiplo * runClean.charAt(body.length - i);
      suma = suma + index;

      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    let dvEsperado = 11 - (suma % 11);

    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    if (dvEsperado != dv) {
      return { verificator: true };
    }
    else null;
  }

  checkRun() {
    let run = this.form.get("rut");
    var runClean = run.value.replace('.', '');
    runClean = runClean.replace('-', '');

    let body = runClean.slice(0, -1);
    let dv = runClean.slice(-1).toUpperCase();

    run.setValue(body + '-' + dv);
  }

  onCloseConfirm() {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    let userData = this.form.value;
    
    this.usersService.insert(userData).subscribe({
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
