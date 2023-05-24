import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbTestPage } from './db-test.page';

const routes: Routes = [
  {
    path: '',
    component: DbTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbTestPageRoutingModule {}
