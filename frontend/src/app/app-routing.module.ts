import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';
import { AdminLayoutSidebarLargeComponent } from './shared/components/layouts/admin-layout-sidebar-large/admin-layout-sidebar-large.component';
import { AuthGuard } from './_helpers/auth.guard';
import { FullInfoGuard } from './_helpers/fullinfo.guard';

const adminRoutes: Routes = [

   {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./views/usuarios/usuarios.module').then(m => m.UsuarioModule)
    },
    {
        path: 'proyectos',
        loadChildren: () => import('./views/proyectos/proyectos.module').then(m => m.ProyectoModule)
    },
    {
        path: 'cursos',
        loadChildren: () => import('./views/cursos/cursos.module').then(m => m.CursosModule)
    },
    {
      path: 'instituciones',
      loadChildren: () => import('./views/instituciones/instituciones.module').then(m => m.InstitucionesModule)
  },
  ];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signin',
    pathMatch: 'full'
  },

  {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sessions',
                loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule)
            }
        ]
  },
  {
        path: '',
        component: AdminLayoutSidebarLargeComponent,
        canActivate: [AuthGuard, FullInfoGuard],
        children: adminRoutes
  },
  {
        path: '**',
        redirectTo: 'others/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
