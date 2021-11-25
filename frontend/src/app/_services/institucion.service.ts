import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  constructor(private http: HttpClient) { }

  insert(data): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/instituciones`, data);
  }

  getAll(){
      return this.http.get(`${env.apiUrl}/instituciones`);
  }

  get(id){
    return this.http.get(`${env.apiUrl}/instituciones/` + id);
  }


}
