import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinitionsPageRoutingModule } from './definitions-routing.module';

import { DefinitionsPage } from './definitions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefinitionsPageRoutingModule
  ],
  declarations: [DefinitionsPage]
})
export class DefinitionsPageModule {}
