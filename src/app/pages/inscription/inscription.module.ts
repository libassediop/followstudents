import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { EleveComponent } from './eleve/eleve.component';
import {UIModule} from "../../shared/ui/ui.module";
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    EleveComponent
  ],
  imports: [
    CommonModule,
    InscriptionRoutingModule,
    UIModule,
    NgbNavModule
  ]
})
export class InscriptionModule { }
