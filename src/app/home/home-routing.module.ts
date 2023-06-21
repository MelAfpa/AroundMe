import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  /*{
    path: 'home',
    component: HomePage,
    children: 
      [
        {
          path: 'carte',
          loadChildren: () => import('../pages/carte/carte.module').then(m => m.CartePageModule)
        },
        {
          path: 'entreprise-detail',
          loadChildren: () => import('../pages/entreprise-detail/entreprise-detail.module').then(m => m.EntrepriseDetailPageModule)
        },
        {
          path: '',
          component: HomePage
          //redirectTo: '/home/carte',
          //pathMatch: 'full'
        }
      ]
    },*/
    /*{
      path: '',
      redirectTo: '/home/carte',
      pathMatch: 'full'
    }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
