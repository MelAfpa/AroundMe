import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntreprisesPage } from './entreprises.page';

const routes: Routes = [
  {
    path: '',
    component: EntreprisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntreprisesPageRoutingModule {}
