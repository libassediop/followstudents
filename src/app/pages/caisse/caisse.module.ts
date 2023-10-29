import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaisseRoutingModule } from './caisse-routing.module';
import { CaisseJournalireComponent } from './caisse-journalire/caisse-journalire.component';
import {UIModule} from "../../shared/ui/ui.module";
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    CaisseJournalireComponent
  ],
  imports: [
    CommonModule,
    CaisseRoutingModule,
    UIModule,
    NgbNavModule,
    NgSelectModule,
    NgbModule
  ]
})
export class CaisseModule { }
