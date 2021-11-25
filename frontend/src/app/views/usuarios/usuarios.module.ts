import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

import { UsuarioRoutingmodule } from './usuarios-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { GestionComponent } from './gestion/gestion.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddUserComponent } from './add-user/add-user.component';
import { MaterialModule } from 'src/app/material.module';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    UsuarioRoutingmodule,
    MaterialModule,
    CustomFormsModule,
    TagInputModule
  ],
  declarations: [GestionComponent, AddUserComponent, EditUserComponent]
})
export class UsuarioModule { }
