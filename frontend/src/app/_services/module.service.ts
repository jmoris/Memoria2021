import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  getAll(id) {
    return this.http.get<any>(`${environment.apiUrl}/modules?project_id=` + id);
  }

  insert(data) {
    return this.http.post<any>(`${environment.apiUrl}/modules`, data);
  }

  delete(id) {
    return this.http.delete<any>(`${environment.apiUrl}/modules/` + id);
  }

  update(data, id){
    return this.http.put<any>(`${environment.apiUrl}/modules/` + id, data);
  }

}
