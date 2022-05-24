import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Project } from '../model-classes/project';
import { map } from "rxjs/operators";
import { environment as env } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
//import { environment as env } from "envi";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  insert(data): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/proyectos`, data);
  }

  update(data, id): Observable<boolean> {
    return this.http.put<any>(`${env.apiUrl}/proyectos/` + id, data);
  }

  addSingle(project_id, user_id){
    return this.http.post<any>(`${env.apiUrl}/proyectos/`+ project_id + `/asignar`, {user_id});
  }

  endProject(project_id){
    return this.http.post<any>(`${env.apiUrl}/proyectos/terminar`, {project_id});
  }

  getAll(ano,semestre,estado): Observable<Project[]> {
    let idInst = this.auth.getInstitucion();
    return this.http.get<any>(`${env.apiUrl}/proyectos?institucion=` + idInst + ((ano)?'&ano='+ano+'':'') + ((semestre)?'&semester='+semestre+'':'') + ((estado)?'&status='+estado+'':'') )
      .pipe(map(result => {
        console.log(result.msg);
        return result;
      }));
  }

  getProjectComplexityAnalysis(project_id, filename, desde, hasta){
    return this.http.get<any>(`${env.apiUrl}/repositorios/reportes/rangecomplexity?project_id=` + project_id + `&filename=` + filename + `&desde=` + desde + `&hasta=` + hasta);
  }

  getComplexityAnalysis(project_id, filename){
    return this.http.get<any>(`${env.apiUrl}/repositorios/reportes/complexity?project_id=` + project_id + `&filename=` + filename);
  }

  analyzeProject(project_id){
    return this.http.get<any>(`${env.apiUrl}/git/analisis?project_id=` + project_id);
  }

  addColaborador(project_id, user_id, gh_user){
    return this.http.post<any>(`${env.apiUrl}/proyectos/`+ project_id + `/enlazar`, {user_id, gh_user});
  }
  detachColaborador(project_id, user_id, gh_user){
    return this.http.post<any>(`${env.apiUrl}/proyectos/`+ project_id + `/desenlazar`, {user_id, gh_user});
  }

  getUserActivity(project_id, gh_user, from_date, to_date){
    return this.http.get<any>(`${env.apiUrl}/proyectos/reportes/actividad?project_id=` + project_id + `&gh_user=` + gh_user + `&from_date=` + from_date + `&to_date=` + to_date);
  }

  getInfoProject(id){
    return this.http.get<any>(`${env.apiUrl}/git/infoproyecto?project_id=` + id);
  }

  getBranchesInfo(id){
    return this.http.get<any>(`${env.apiUrl}/repositorio/branches?project_id=` + id);
  }

  getKlocReport(id){
    return this.http.get<any>(`${env.apiUrl}/repositorios/reportes/kloc?project_id=` + id);
  }

  getMaatReport(id){
    return this.http.get<any>(`${env.apiUrl}/repositorios/reportes/maat?project_id=` + id);
  }

  get(id): Observable<Project[]> {
    return this.http.get<any>(`${env.apiUrl}/proyectos/` + id);
  }

  delete(id){
    return this.http.delete<any>(`${env.apiUrl}/proyectos/` + id);
  }

  getRoles(){
    return this.http.get<any>(`${env.apiUrl}/roles`);
  }

  getUsersFromProject(id){
    let idInst = this.auth.getInstitucion();
    return this.http.get<any>(`${env.apiUrl}/proyectos/listar/` + id + `?institucion=` + idInst);
  }

  getColaboradoresFromProject(id){
    let idInst = this.auth.getInstitucion();
    return this.http.get<any>(`${env.apiUrl}/proyectos/colaboradores/` + id + `?institucion=` + idInst);
  }

  getWIKIFiles(id){
    return this.http.get<any>(`${env.apiUrl}/repositorio/wiki?project_id=` + id);
  }

  getGitTree(id){
    return this.http.get<any>(`${env.apiUrl}/repositorio/arbol?tree_id=` + id);
  }

  getWIKIFile(id, file){
    return this.http.get(`${env.apiUrl}/repositorio/wiki/fichero?project_id=` + id + `&file=` + file, {
      responseType: 'text'
   });
  }

  getTableros(id){
    return this.http.get<any>(`${env.apiUrl}/repositorio/tableros?project_id=` + id);
  }

  getTablero(id){
    return this.http.get<any>(`${env.apiUrl}/repositorio/tablero?project_id=` + id);
  }


  deleteUserFromProject(role,idUser,idProject){
    return this.http.post<any>(`${env.apiUrl}/proyectos/detachuser` ,{user_id:idUser,role_id:role,project_id:idProject});
  }

  insertComplete(data){
      return this.http.post<any>(`${env.apiUrl}/proyectos`, data);
  }

  getBranchCommits(project_id, branch){
    return this.http.get<any>(`${env.apiUrl}/repositorio/branchcommits?project_id=` + project_id + `&branch=` + branch);
  }

  reporteProyecto(id){
    return this.http.get<any>(`${env.apiUrl}/proyectos/reportes/repositorio?project_id=` + id);
  }
  reporteUsuario(id, idUsuario){
    return this.http.get<any>(`${env.apiUrl}/proyectos/reportes/usuario?project_id=` + id + `&user=` + idUsuario);
  }

}
