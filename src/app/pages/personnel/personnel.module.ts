import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelComponent } from './personnel/personnel.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonnelComponent
  ],
  imports: [
    CommonModule,
    PersonnelRoutingModule,
    UIModule,
    NgbTooltipModule,
    NgbNavModule,
    WidgetModule,
    FormsModule,
  ]
})
export class PersonnelModule { }
