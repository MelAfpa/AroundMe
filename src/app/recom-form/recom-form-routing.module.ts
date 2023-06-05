import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomFormPage } from './recom-form.page';

const routes: Routes = [
  {
    path: '',
    component: RecomFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomFormPageRoutingModule {}
