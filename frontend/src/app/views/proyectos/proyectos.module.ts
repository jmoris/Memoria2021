import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ngx-custom-validators';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbDropdown, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProyectoRoutingModule } from './proyectos-routing.module';
import { GestionComponent } from './gestion/gestion.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MaterialModule } from 'src/app/material.module';
import { DetailsProjectComponent } from './gestion/details-project/details-project.component';
import { ProjectComponent } from './project/project.component';
import { FormWizardModule } from 'src/app/shared/components/form-wizard/form-wizard.module';
import { NgApexchartsModule} from 'ng-apexcharts';
import { MdRenderModule } from '@nvxme/ngx-md-render';
import { IssuesComponent } from './project/issues/issues.component';
import { InformeMaatComponent } from './project/informe-maat/informe-maat.component';
import { InformeClocComponent } from './project/informe-cloc/informe-cloc.component';
import { UserActivityComponent } from './project/user-activity/user-activity.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    ProyectoRoutingModule,
    CustomFormsModule,
    FormWizardModule,
    TagInputModule,
    NgbModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MdRenderModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  declarations: [GestionComponent, AddProjectComponent, DetailsProjectComponent,ProjectComponent,EditProjectComponent,IssuesComponent, InformeMaatComponent, InformeClocComponent, UserActivityComponent]
})
export class ProyectoModule { }

