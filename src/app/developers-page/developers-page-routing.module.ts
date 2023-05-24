import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevelopersPagePage } from './developers-page.page';

const routes: Routes = [
  {
    path: '',
    component: DevelopersPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevelopersPagePageRoutingModule {}
