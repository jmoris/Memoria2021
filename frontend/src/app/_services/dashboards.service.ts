import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class DashboardsService {

    constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

    getDashboardInfo(){
        let idInst = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/dashboard?institucion=` + idInst);
    }
}