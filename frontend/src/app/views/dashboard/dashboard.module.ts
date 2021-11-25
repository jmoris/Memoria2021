import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { DashboadEstudianteComponent } from './dashboad-estudiante/dashboad-estudiante.component';
import { DashboadDocenteComponent } from './dashboad-docente/dashboad-default.component';
import { DashboadAyudanteComponent } from './dashboard-ayudante/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
    CustomFormsModule,
    TagInputModule
  ],
  declarations: [DashboadDefaultComponent, DashboadEstudianteComponent, DashboadAyudanteComponent, DashboadDocenteComponent]
})
export class DashboardModule { }
