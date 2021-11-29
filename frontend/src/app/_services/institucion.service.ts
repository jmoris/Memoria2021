import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  insert(data): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/instituciones`, data);
  }

  getAll(){
      return this.http.get(`${env.apiUrl}/instituciones`);
  }

  get(id){
    return this.http.get(`${env.apiUrl}/instituciones/` + id);
  }

  delete(id){
    return this.http.delete<any>(`${env.apiUrl}/instituciones/` + id);
  }
  update(id, data) {
    data.institucion = this.auth.getInstitucion();
    return this.http.put<any>(`${env.apiUrl}/instituciones/` + id, data);
}

}
