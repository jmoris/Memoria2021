import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncrementService {

  constructor(private http: HttpClient) { }

  insert(data): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/increments`, data);
  }

  getAll(id){
      return this.http.get(`${env.apiUrl}/increments?project_id=` + id);
  }

  get(id){
    return this.http.get(`${env.apiUrl}/increments/` + id);
  }


}
