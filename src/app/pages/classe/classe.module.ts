import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseRoutingModule } from './classe-routing.module';
import { ClasseComponent } from './classe/classe.component';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { WidgetModule } from "../../shared/widget/widget.module";
import { DetailsEleveComponent } from './details-eleve/details-eleve.component';
import { ListeEleveParClasseComponent } from './liste-eleve-par-classe/liste-eleve-par-classe.component';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
    declarations: [
        ClasseComponent,
        ListeEleveParClasseComponent,
        DetailsEleveComponent,
    ],
    imports: [
        CommonModule,
        ClasseRoutingModule,
        UIModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule,
        NgbTypeaheadModule,
        NgbNavModule,
        NgSelectModule,
        NgbDatepickerModule,
        Ng2SmartTableModule,
        WidgetModule,
        NgbPaginationModule,
        ArchwizardModule
    ]
})
export class ClasseModule { }
