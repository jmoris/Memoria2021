import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRequirementService {

  constructor(private http: HttpClient) { }

  insert(data): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/userrequirements`, data);
  }

  update(data, id): Observable<boolean> {
    return this.http.put<any>(`${env.apiUrl}/userrequirements/` + id, data);
  }

  getAll(id){
      return this.http.get(`${env.apiUrl}/userrequirements?project_id=` + id);
  }

  getNextId(id){
    return this.http.get(`${env.apiUrl}/userrequirements/nextid/` + id);
  }

  delete(id){
    return this.http.delete<any>(`${env.apiUrl}/userrequirements/` + id);
  }


}
