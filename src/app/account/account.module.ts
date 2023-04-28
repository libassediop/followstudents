import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    AuthModule
  ]
})
export class AccountModule { }
