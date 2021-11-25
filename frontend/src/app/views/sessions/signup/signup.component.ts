import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    check: boolean = true;
    msgError: string;
    
    constructor(
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Cargando modulos...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            rut: ["", [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/), this.checkVerificatorDigit]],
            enrollment: ['', Validators.required],
            password: ['', Validators.required]
        });
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
        let run = this.signinForm.get("rut");
        var runClean = run.value.replace('.', '');
        runClean = runClean.replace('-', '');
    
        let body = runClean.slice(0, -1);
        let dv = runClean.slice(-1).toUpperCase();
    
        run.setValue(body + '-' + dv);
      }

    updateInfo() {
        this.loading = true;
        this.loadingText = 'Conectando...';
        let f = this.signinForm.value;
        this.auth.updateInfo(f.rut, f.enrollment, f.password)
            .pipe(first())
            .subscribe(
                data => {
                    if (!data.success) {
                        this.msgError = data.message;
                        this.check = false;
                        this.loading = false;
                    } else {
                        this.auth.logout();
                        this.router.navigateByUrl('/dashboard/v1');
                    }
                },
                error => {
                    //this.error = error;
                    if (error === 'Unknown Error') {
                        this.msgError = 'No se puede conectar al servidor.';
                        this.check = false;
                        this.loading = false;
                    }
                    this.msgError = error.message;
                    this.check = false;
                    this.loading = false;
                });
    }
}
