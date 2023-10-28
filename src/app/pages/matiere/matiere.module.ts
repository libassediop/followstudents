import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatiereRoutingModule } from './matiere-routing.module';
import { MatiereComponent } from './matiere/matiere.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ArchwizardModule } from 'angular-archwizard';
import { SimplebarAngularModule } from 'simplebar-angular';



@NgModule({
    declarations: [
        MatiereComponent
    ],
    imports: [
        CommonModule,
        MatiereRoutingModule,
        UIModule,
        NgbDropdownModule,
        NgApexchartsModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        NgbNavModule,
        NgbModalModule,
        NgbDatepickerModule,
        ArchwizardModule,
        SimplebarAngularModule
       
    ]
})
export class MatiereModule { }
