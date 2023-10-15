import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { EleveComponent } from './eleve/eleve.component';
import {UIModule} from "../../shared/ui/ui.module";
import {NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensualiteComponent } from './mensualite/mensualite.component';
import { ListMensualiteComponent } from './list-mensualite/list-mensualite.component';
import { ListInscriptionComponent } from './list-inscription/list-inscription.component';
import { SuiviPaiementComponent } from './suivi-paiement/suivi-paiement.component';
import {WidgetModule} from "../../shared/widget/widget.module";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    EleveComponent,
    MensualiteComponent,
    ListMensualiteComponent,
    ListInscriptionComponent,
    SuiviPaiementComponent
  ],
    imports: [
        CommonModule,
        InscriptionRoutingModule,
        UIModule,
        NgbNavModule,
        FormsModule,
        ReactiveFormsModule,
        WidgetModule,
        NgbPaginationModule,
        NgSelectModule
    ]
})
export class InscriptionModule { }
