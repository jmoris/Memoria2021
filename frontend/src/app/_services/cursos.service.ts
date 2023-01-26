import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class CursosService {

    constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

    getAll(estado) {
        let idInst = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/cursos?estado=`+ estado + `&institucion=` + idInst);
    }

    get(id) {
        return this.http.get<any>(`${environment.apiUrl}/cursos/` + id);
    }

    insert(data) {
        return this.http.post<any>(`${environment.apiUrl}/cursos`, data);
    }

    delete(id) {
        return this.http.delete<any>(`${environment.apiUrl}/cursos/` + id);
    }

    recovery(id) {
        return this.http.delete<any>(`${environment.apiUrl}/cursos/recuperar/` + id);
    }

    agregarProfeAcurso(data) {
        console.log("datos en service: ", data);
        return this.http.post<any>(`${environment.apiUrl}/cursos/assign`, data);
    }

    agregarAyudanteAcurso(data) {
        return this.http.post<any>(`${environment.apiUrl}/cursos/assignAyudante`, data);
    }

    insertComplete(data) {
        data.institucion = this.auth.getInstitucion();
        return this.http.post<any>(`${environment.apiUrl}/cursos`, data);
    }

    usersList(id) {
        let idInst = this.auth.getInstitucion();
        return this.http.get<any>(`${environment.apiUrl}/cursos/listar/` + id + `?institucion=` + idInst);
    }

    updateCourse(id, data) {
        data.institucion = this.auth.getInstitucion();
        return this.http.put<any>(`${environment.apiUrl}/cursos/` + id, data);
    }

    addSingleUser(iduser, idcurso){
        return this.http.post<any>(`${environment.apiUrl}/cursos/` + idcurso + `/asignar`, {user_id: iduser});
    }

    uploadFile(fileToUpload: File, id): Observable<boolean> {
        let inst = this.auth.getInstitucion();
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('institucion', inst.toString());
        return this.http.post<any>(`${environment.apiUrl}/cursos/uploadfile/` + id, formData);
    }

    deleteFromCourse(iduser,idcurso)
    {
        return this.http.put<any>(`${environment.apiUrl}/cursos/deleteFromCourse`, {iduser: iduser, idcourse: idcurso});
    }

}
