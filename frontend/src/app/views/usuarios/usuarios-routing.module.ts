import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { ConfiguracionUsuarioComponent } from './configuracionUsuario/configuracionUsuario.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: GestionComponent
  },
  {
    path: 'configuracionUsuario',
    component: ConfiguracionUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingmodule { }
