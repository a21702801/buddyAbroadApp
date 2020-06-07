import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FrogotPasswordPageRoutingModule } from './frogot-password-routing.module';

import { FrogotPasswordPage } from './frogot-password.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FrogotPasswordPageRoutingModule
  ],
  declarations: [FrogotPasswordPage]
})
export class FrogotPasswordPageModule {}
