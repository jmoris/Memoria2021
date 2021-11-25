import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoftwareRequirementsService {

  constructor(private http: HttpClient) { }

  insert(data): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/softwarerequirements`, data);
  }

  update(data, id): Observable<boolean> {
    return this.http.put<any>(`${env.apiUrl}/softwarerequirements/` + id, data);
  }

  getAll(id){
      return this.http.get(`${env.apiUrl}/softwarerequirements?project_id=` + id);
  }

  getNextId(id){
    return this.http.get(`${env.apiUrl}/softwarerequirements/nextid/` + id);
  }

  delete(id){
    return this.http.delete<any>(`${env.apiUrl}/softwarerequirements/` + id);
  }

}
