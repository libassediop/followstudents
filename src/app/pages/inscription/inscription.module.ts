import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { EleveComponent } from './eleve/eleve.component';
import {UIModule} from "../../shared/ui/ui.module";
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
// Importez le module FormsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EleveComponent
  ],
  imports: [
    // Ajoutez FormsModule à la liste des imports
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InscriptionRoutingModule,
    UIModule,
    NgbNavModule
  ]
})
export class InscriptionModule { }
