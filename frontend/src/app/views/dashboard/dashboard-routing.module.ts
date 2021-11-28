import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { DashboadEstudianteComponent } from './dashboad-estudiante/dashboad-estudiante.component';
import { DashboadAyudanteComponent } from './dashboard-ayudante/dashboad-default.component';
import { DashboadDocenteComponent } from './dashboad-docente/dashboad-default.component';
import { ProfileGuard } from 'src/app/_helpers/profile.guard';
import { DashboardSuperAdminComponent } from './dashboard-suparadmin/dashboad-superadmin.component';


const routes: Routes = [
  {
    path: 'v1',
    component: DashboadDefaultComponent,
    //canActivate: [ProfileGuard]
  },
  {
    path: 'v2',
    component: DashboadEstudianteComponent,
    canActivate: [ProfileGuard]
  },

  {
    path: 'v3',
    component: DashboadAyudanteComponent,
    canActivate: [ProfileGuard]
  },

  {
    path: 'v4',
    component: DashboadDocenteComponent,
    canActivate: [ProfileGuard]
  },
  {
    path: 'admin',
    component: DashboardSuperAdminComponent,
  //  canActivate: [ProfileGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
