import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: GestionComponent
  },
  {
    path: 'gestion/:id',
    component: CursoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
