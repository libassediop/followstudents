import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesseurRoutingModule } from './professeur-routing.module';
import { ClasseEnseignerComponent } from './classe-enseigner/classe-enseigner.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { UIModule } from "../../shared/ui/ui.module";
import { WidgetModule } from "../../shared/widget/widget.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
    declarations: [
        ClasseEnseignerComponent,
        ProfesseurComponent
    ],
    imports: [
        CommonModule,
        ProfesseurRoutingModule,
        UIModule,
        WidgetModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgApexchartsModule,
        NgbTypeaheadModule,
        NgbNavModule,
        NgSelectModule,
        NgbDatepickerModule,
        Ng2SmartTableModule,
        ArchwizardModule,
    
    ]
})
export class ProfesseurModule { }
