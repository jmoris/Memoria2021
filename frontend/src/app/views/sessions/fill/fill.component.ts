import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { InstitucionService } from 'src/app/_services/institucion.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
    selector: 'app-fill',
    templateUrl: './fill.component.html',
    styleUrls: ['./fill.component.scss'],
    animations: [SharedAnimations]
})
export class FillComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    check: boolean = true;
    msgError: string;
    instituciones: [];
    id: any;
    user: any;

    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        password: [''],
        rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/), this.checkVerificatorDigit]],
        enrollment: [''],
        role: [''],
        gh_user: ['', Validators.required],
        gh_token: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UsuariosService
    ) {
        const currentUser = this.auth.currentUserValue.user;
        this.id = currentUser.id;
        this.getUserData();
    }

    getUserData() {
        this.loading = true;
        this.userService.getUserById(this.id).subscribe({
            next: result => {
                console.log(result);
                this.user = result;
                this.form.get('name').setValue(result.name);
                this.form.get('lastname').setValue(result.lastname);
                this.form.get('email').setValue(result.email);
                this.form.get('password').setValue("");
                //this.form.get('rut').setValue(result.rut);
                this.form.get('enrollment').setValue(result.enrollment);
                this.form.get('role').setValue(result.pivot.role_id.toString());
                this.loading = false;
            }, error: result => {
                console.log(result);
            }
        });
    }

    guardarInformacion(){
        if (this.form.invalid) {
            (<any>Object).values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            return;
          }
      
          let userData = this.form.value;
      
      
          this.userService.updateUser(this.id, userData).subscribe({
            next: result => {
              console.log(result);
              localStorage.clear();
                this.auth.logout();
            },
            error: result => {
              console.log(result);
            }
          });
    }

    ngOnInit() {
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

}
