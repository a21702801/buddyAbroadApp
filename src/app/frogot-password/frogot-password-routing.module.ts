import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrogotPasswordPage } from './frogot-password.page';

const routes: Routes = [
  {
    path: '',
    component: FrogotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrogotPasswordPageRoutingModule {}
