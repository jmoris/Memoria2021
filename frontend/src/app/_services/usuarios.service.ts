import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

    constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

    getAll() {
        let id = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/usuarios?institucion=` + id);
    }

    getUserById(id) {
        let idInst = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/usuarios/` + id + `?institucion=` + idInst);
    }

    updateUser(id, data) {
        console.log("DATOS EN SERVICE: ", data)
        data.institucion = this.auth.getInstitucion();
        console.log("QUE TIENE ESTA MIERDA: ", this.http.put<any>(`${environment.apiUrl}/usuarios/` + id, data))
        return this.http.put<any>(`${environment.apiUrl}/usuarios/` + id, data);

    }

    disableUser(id, status) {
        console.log("id: ", id);
        console.log("id: ", status);
        return this.http.post<any>(`${environment.apiUrl}/usuarios/` + id + `/disable`, { status: status });
    }

    getStudents() {
        let inst = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/estudiantes?institucion=` + inst);
    }

    getTeachers() {
        let inst = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/profesores?institucion=` + inst);
    }

    insert(data) {
        data.institucion = this.auth.getInstitucion();
        return this.http.post<any>(`${environment.apiUrl}/usuarios`, data);
    }

    delete(id) {
        return this.http.delete<any>(`${environment.apiUrl}/usuarios/` + id);
    }

    infoDash() {
        return this.http.get<any>(`${environment.apiUrl}/info`);
    }

    uploadFile(fileToUpload: File): Observable<boolean> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        return this.http.post<any>(`${environment.apiUrl}/usuarios/uploadfile`, formData);
    }
}
