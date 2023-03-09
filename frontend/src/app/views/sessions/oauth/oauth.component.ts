import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';
import { InstitucionService } from 'src/app/_services/institucion.service';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.scss'],
    animations: [SharedAnimations]
})
export class OauthComponent implements OnInit {
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
        private route: ActivatedRoute,
        private instService: InstitucionService
    ) { }

    ngOnInit() {
        this.loading = true;
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

        this.route.queryParams
      .subscribe(params => {
        console.log(JSON.parse(params.user));
        let response : any = {
            'success' : params.success,
            'token': params.token,
            'role': params.role,
            'user': JSON.parse(params.user),
            'institucion': params.institucion,
            'token_type': 'Bearer'
        };
        this.auth.loginOauth2(response);

        if(!response.success){
            this.msgError = response.message;
            this.check = false;
            this.loading = false;
        }else{
            if(response.role == 'Administrador'){
                this.router.navigate(['/dashboard/v1'])
                .then(() => {
                    window.location.reload();
                });
            }else if(response.role == 'Alumno'){
                this.router.navigate(['/dashboard/v2'])
                .then(() => {
                    window.location.reload();
                });
            }else if(response.role == 'Profesor'){
                this.router.navigate(['/dashboard/v4'])
                .then(() => {
                    window.location.reload();
                });
            }else if(response.role == 'Superadministrador'){
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
