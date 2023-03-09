import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { InstitucionService } from 'src/app/_services/institucion.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    check:boolean = true;
    msgError: string;
    instituciones : [];
    constructor(
        private fb: FormBuilder,
        private auth: AuthenticationService,
        private router: Router,
        private instService: InstitucionService
    ) { }

    ngOnInit() {
        setTimeout(function(){
            location.href = "http://sso.ghtracker.site";
          },2000);
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
            institucion: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.instService.getAll().subscribe((resp: any) => {
            this.instituciones = resp;
        });
    }

    signin() {
        this.loading = true;
        this.loadingText = 'Conectando...';
        let f = this.signinForm.value;
        this.auth.login(f.institucion, f.email, f.password)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(this.auth.currentUserValue);
                    console.log("afsadf");
                    if(!data.success){
                        this.msgError = data.message;
                        this.check = false;
                        this.loading = false;
                    }else{
                        const currentUser = this.auth.currentUserValue;
                        if(currentUser.rut == '1-9'){
                            this.router.navigate(['/session/fill/'+currentUser.id]);
                        }
                        if(currentUser.role == 'Administrador'){
                            this.router.navigate(['/dashboard/v1'])
                            .then(() => {
                                window.location.reload();
                            });
                        }else if(currentUser.role == 'Alumno'){
                            this.router.navigate(['/dashboard/v2'])
                            .then(() => {
                                window.location.reload();
                            });
                        }else if(currentUser.role == 'Profesor'){
                            this.router.navigate(['/dashboard/v4'])
                            .then(() => {
                                window.location.reload();
                            });
                        }else if(currentUser.role == 'Superadministrador'){
                            this.router.navigate(['/dashboard/admin'])
                            .then(() => {
                                window.location.reload();
                            });
                        }
                    }
                },
                error => {
                    //this.error = error;
                    if(error === 'Unknown Error'){
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
