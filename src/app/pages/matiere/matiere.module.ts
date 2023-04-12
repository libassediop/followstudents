import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatiereRoutingModule } from './matiere-routing.module';
import { MatiereComponent } from './matiere/matiere.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        MatiereComponent
    ],
    imports: [
        CommonModule,
        MatiereRoutingModule,
        UIModule,
        FormsModule
    ]
})
export class MatiereModule { }
