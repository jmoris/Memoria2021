import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../_models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    signin(value: any) {
        throw new Error("Method not implemented.");
    }
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(institucion: number, email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { institucion, email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    updateInfo(rut: string, enrollment: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/updateinfo`, { rut, enrollment, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.clear();
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigateByUrl("/sessions/signin");
    }

    getInstitucion(): String {
        let tokenInfo = this.currentUserValue;
        return tokenInfo.institucion;
    }

    getUserType(): String {
        let tokenInfo = this.currentUserValue;
        console.log("info: ", tokenInfo.role);
        return tokenInfo.role;
    }
}
