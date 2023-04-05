import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlerteRoutingModule } from './alerte-routing.module';
import { AlerteNoteComponent } from './alerte-note/alerte-note.component';
import {UIModule} from "../../shared/ui/ui.module";
import {FormsModule} from "@angular/forms";
import { AlerteAbsenceComponent } from './alerte-absence/alerte-absence.component';
import { AlerteMessageComponent } from './alerte-message/alerte-message.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    AlerteNoteComponent,
    AlerteAbsenceComponent,
    AlerteMessageComponent
  ],
    imports: [
        CommonModule,
        AlerteRoutingModule,
        UIModule,
        FormsModule,
        CKEditorModule,
        NgSelectModule
    ]
})
export class AlerteModule { }
