import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatiereRoutingModule } from './matiere-routing.module';
import { MatiereComponent } from './matiere/matiere.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [
        MatiereComponent
    ],
    imports: [
        CommonModule,
        MatiereRoutingModule,
        UIModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule
       
    ]
})
export class MatiereModule { }
