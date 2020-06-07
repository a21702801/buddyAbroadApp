import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinitionsPage } from './definitions.page';

const routes: Routes = [
  {
    path: '',
    component: DefinitionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinitionsPageRoutingModule {}
